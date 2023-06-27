import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, HostListener, Inject, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { } from 'google.maps';
import { PositionZoomService } from 'src/app/services/position-zoom/position-zoom.service';
import { CaseMarker, MarkerColor, PositionZoom } from 'src/app/useful/interfaces';
import { getLabelAndValueForCaseMarkerAttribute, getSeriesAndVariantOrModelNameAtributes } from 'src/app/useful/utils';
import { environment } from 'src/environments/environment';


const BasePathToMarkerIcon = 'assets/images/map-markers/location-pin_64px_';
const BasePathToFilledMarkerIcon = 'assets/images/map-markers/location-pin_filled_64px_';
const MarkerIconFormat = '.png';

const DEFAULT_ZOOM_LEVEL = 3;
const NORTH_BOUND_LIMIT = 85;
const SOUTH_BOUND_LIMIT = -85;
const EAST_BOUND_LIMIT = 180;
const WEST_BOUND_LIMIT = -180;
@Component({
    selector: 'app-coverage-maps',
    templateUrl: './coverage-maps.component.html',
    styleUrls: ['./coverage-maps.component.scss']
})
export class CoverageMapsComponent implements AfterViewInit {
    @ViewChild('map') mapElement: any;
    @Input() newMarkerStatusValue: string;
    @Input() forbiddenStatusChange: string;
    @Input() width: string;
    @Input() isCaseDetailsMode: boolean;
    @Input() focusOnMarker: CaseMarker;
    @Input() markerNewStatus: string;
    @Input() casesMarkers: CaseMarker[];
    @Input() caseMarkersColor = null;
    @Input() caseDetailsTraceMarkers: CaseMarker[];
    @Output() readonly updateMultipleMarkersStatus = new EventEmitter<CaseMarker[]>();
    @Output() readonly updateSingleMarkersStatus =new EventEmitter<CaseMarker>();
    @Output() readonly openCaseDetails = new EventEmitter<number>();

    map: google.maps.Map;
    casesMapMarkers: google.maps.Marker[];
    caseDetailsTraceMapMarkers: google.maps.Marker[] = [];
    selectedMarkers: google.maps.Marker[] = [];
    ctrlKeyPressed = false;
    leftClickPressed = false;
    rectangleSelection = null;
    bounds = null;
    mouseDownPos = null;
    defaultMapMarkerIcon = null;
    selectedMapMarkerIcon = null;
    traceMapMarkerIcon = null;
    infoWindow: google.maps.InfoWindow;
    trashMarker = MarkerColor.new;
    tracePathLine: google.maps.Polyline;
    allCaseTraceMarkersCoordinates = [];
    positionZoom: PositionZoom = {};
    
    @HostListener('window:keydown', ['$event'])
    onKeyDown(event: KeyboardEvent) {
        if (event.key === 'Control' && !!this.ctrlKeyPressed) {
            return;
        } else if (event.key === 'Control') {
            this.ctrlKeyPressed = true;
        } else {
            this.ctrlKeyPressed = false;
        }
    }

    @HostListener('window:keyup', ['$event'])
    onKeyUp(event: KeyboardEvent) {
        if (event.key === 'Control' && !!this.ctrlKeyPressed) {
            this.ctrlKeyPressed = false;
        }
    }

    constructor(@Inject(DOCUMENT) public document: any, private positionAndZoom: PositionZoomService) { }

    ngAfterViewInit(): void {
        this.loadMapsJavascriptlibrary();
    }

    ngOnChanges(sc: SimpleChanges) {
        if (
            !!sc['casesMarkers'] &&
            !!sc['casesMarkers'].currentValue &&
            !!this.map
        ) {
            const markers = sc['casesMarkers'].currentValue;
            this.getCasesMarkersDetailsAndUpdateMap(markers);
        } else if (
            !!sc['caseDetailsTraceMarkers'] &&
            !!sc['caseDetailsTraceMarkers'].currentValue &&
            !!this.map
        ) {
            this.caseDetailsTraceMarkers =
                sc['caseDetailsTraceMarkers'].currentValue;
            this.updateMapWithTracesMarker(this.caseDetailsTraceMarkers);
        } else if (
            !!sc['focusOnMarker'] &&
            !!sc['focusOnMarker'].currentValue &&
            !!this.casesMarkers?.length &&
            !!this.map
        ) {
            this.focusOnMarker = sc['focusOnMarker'].currentValue;
            this.getCasesMarkersDetailsAndUpdateMap(this.casesMarkers);
        }
    }

    private loadMapsJavascriptlibrary() {
        if (!this.document.getElementById('google-map-api-script')) {
            let s = document.createElement('script');
            s.id = 'google-map-api-script';
            s.type = 'text/javascript';
            s.src ='https://maps.googleapis.com/maps/api/js?key=' + environment.googleMapsApiKey;
            s.onload = () => {
                this.afterMapsJavaScriptLoaded();
            };
            this.document.body.appendChild(s);
        } else {
            this.afterMapsJavaScriptLoaded();
        }
    }
    afterMapsJavaScriptLoaded(): void {
        this.setUpMapsProperties();
        this.getCasesMarkersDetailsAndUpdateMap(this.casesMarkers);
    }

    setUpMapsProperties() {
        console.log('Google Maps API version: ' + google.maps.version);
        const mapProperties = {
            fullscreenControl: false,
            center: new google.maps.LatLng(0,0),
            zoom: DEFAULT_ZOOM_LEVEL,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            minZoom: DEFAULT_ZOOM_LEVEL,
            restriction: {
                latLngBounds: {
                    north: NORTH_BOUND_LIMIT,
                    south: SOUTH_BOUND_LIMIT,
                    west: WEST_BOUND_LIMIT,
                    east: EAST_BOUND_LIMIT,
                },
            },
            mapTypeControl: !!this.isCaseDetailsMode,
            streetViewControl: !!this.isCaseDetailsMode,
        };
        this.map = new google.maps.Map(
            this.mapElement.nativeElement,
            mapProperties
        );
        this.defaultMapMarkerIcon = {
            url: BasePathToMarkerIcon + MarkerColor.new + MarkerIconFormat,
            scaledSize: new google.maps.Size(40, 45),
        };
        this.selectedMapMarkerIcon = {
            url:
                BasePathToFilledMarkerIcon + MarkerColor.new + MarkerIconFormat,
            scaledSize: new google.maps.Size(40, 45),
            anchor: new google.maps.Point(20, 41),
        };
        this.traceMapMarkerIcon = {
            url:
                BasePathToMarkerIcon +
                MarkerColor.inProgress +
                MarkerIconFormat,
            scaledSize: new google.maps.Size(30, 35),
            anchor: new google.maps.Point(15, 31),
        };

        google.maps.event.addListener(this.map, 'click', (e) => {
            this.unselectAllMarkers();
            if (!!this.isCaseDetailsMode) {
                this.openCaseDetails.emit(0); //no current case selection
                this.focusOnMarker = null;
            }
        });
        console.log("mapProperties.zoom",mapProperties.zoom);
        this.map.addListener("zoom_changed", () => {
            this.positionZoom.zoom = this.map.getZoom()!;
            this.positionZoom.position = this.map.getCenter()!;
            console.log("this.positionZoom.position", this.positionZoom.position)
            if (this.positionZoom.zoom >= DEFAULT_ZOOM_LEVEL && this.positionZoom.position != mapProperties.center) {
                this.positionAndZoom.addToStore(
                    this.positionZoom
                );
                mapProperties.zoom = 
                mapProperties.zoom = this.positionAndZoom.getLatesZoom();
                console.log("mapProperties.zoom",mapProperties.zoom);
            }
            console.log("this.positionAndZoom in Maps Wrapper", this.positionAndZoom.getLatesZoom());
          });

    }

    setRectangleRegionMarkerSelectionListener() {
        google.maps.event.addListener(this.map, 'mousemove', (e) =>
            this.extendSelectionRectangleWithEventCoordinates(e)
        );
        google.maps.event.addListener(this.map, 'mousedown', (e) =>
            this.setRectangleSelectionStartingPoint(e)
        );
        google.maps.event.addListener(this.map, 'mouseup', (e) =>
            this.selectAllMarkersInsideRectangle()
        );
    }

    private setMarkerEventsListeners(mapsMarker: google.maps.Marker) {
        google.maps.event.addListener(mapsMarker, 'click', (clickEvent) => {
            if (!this.ctrlKeyPressed) {
                this.focusOnMarker = this.findCaseMarkerInCurrentMarkersList(
                    mapsMarker.get('caseId')
                );
                this.openCaseDetails.emit(mapsMarker.get('caseId'));
                this.removeCaseDetailsTraceMarkers();
            }
        });
        if (!this.isCaseDetailsMode) {
            this.addMarkerSelectionListeners(mapsMarker);
        }
    }

    addMarkerSelectionListeners(mapsMarker: google.maps.Marker) {
        google.maps.event.addListener(mapsMarker, 'dragend', (dragEvent) => {
            this.map.setOptions({
                draggable: true,
            });
            if (!this.selectedMarkers.length) {
                this.updateSingleMarkerStausAndRemoveFromMap(mapsMarker);
            } else {
                this.updateSelectedMarkersStausAndRemoveFromMap();
            }
        });

        google.maps.event.addListener(mapsMarker, 'dragstart', (dragEvent) => {
            this.map.setOptions({
                draggable: false,
            });
        });

        google.maps.event.addListener(mapsMarker, 'drag', (dragEvent) => {
            if (this.isMarkerAlreadySelected(mapsMarker)) {
                this.selectedMarkers.forEach((m) => {
                    m.setPosition(
                        new google.maps.LatLng(
                            dragEvent.latLng.lat(),
                            dragEvent.latLng.lng()
                        )
                    );
                });
            } else {
                this.unselectAllMarkers();
            }
        });

        google.maps.event.addListener(
            mapsMarker,
            'mousedown',
            (clickMarkerEvent) => {
                if (this.ctrlKeyPressed) {
                    let marker = this.casesMapMarkers.find((m) => {
                        return m.get('caseId') === mapsMarker.get('caseId');
                    });
                    this.addMarkerInSelectionList(marker);
                }
            }
        );

        this.setInfoWindowForMarker(mapsMarker);
    }

    private setInfoWindowForMarker(mapsMarker) {
        const infoWindowOpenOptions = {
            map: this.map,
            anchor: mapsMarker,
            shouldFocus: false,
        };
        const infoWindowOptions = {
            position: { lat: 50.881832, lng: -87623177 },
            maxWidth: 260,
            disableAutoPan: true,
        };

        this.infoWindow = new google.maps.InfoWindow(infoWindowOptions);

        google.maps.event.addListener(mapsMarker, 'mouseover', () => {
            let foundCaseMarkerToDisplay: CaseMarker = this.casesMarkers.find(
                (m) => m.caseId === mapsMarker.get('caseId')
            );
            this.infoWindow.setContent(
                this.setContentInfoWindow(foundCaseMarkerToDisplay)
            );
            this.infoWindow.open(infoWindowOpenOptions);
        });

        google.maps.event.addListener(mapsMarker, 'mouseout', () => {
            this.infoWindow.close();
        });
    }

    setContentInfoWindow(caseMarker: CaseMarker) {
        let sa05dx: string;
        if (caseMarker.sa05dx == true) {
            sa05dx = '05DX;';
        } else {
            sa05dx = '';
        }

        const content = `
        <style>
            .gm-style-iw > button{
                display: none !important;
            }
            .containerTxt{
                display: flex;
            }
            th{
               vertical-align: top;
               font-family: 'BMWGroupTNCondensedProTT-Bold', Arial, Helvetica, sans-serif;
               text-align: left;
            }
            td{
               padding-left:5px;
               font-family: 'BMWGroupTNCondensedTT-Regular', Arial, Helvetica, sans-serif; font-size: 12px;
            }
            .containerImg {
                width: 100%;
                height: 100px;
                background-image: url(${caseMarker.img});
                background-size: cover;
                background-repeat: no-repeat;
                background-position: 50% 50%;
                border-radius: 5px;
              }
              .containerTxt ul{
                margin:0; 
                padding:0;
                list-style-type:none;
              }
        </style>
        <div class="containerImg"></div>
        <div class="containerTxt">
        <table>
        <tr>
            <th>
                Case ID: 
            </th>
            <td>
                ${getLabelAndValueForCaseMarkerAttribute(
                    caseMarker,
                    caseMarker.caseId)
                }
            </td>
        </tr>
        <tr>
            <th>
                Model:
            </th>
            <td>
                <p>
                    ${getSeriesAndVariantOrModelNameAtributes(
                        caseMarker,
                        caseMarker.series,
                        caseMarker.variant)
                    }
                </p>
            </td>
        </tr>
        <tr>
            <th>
                Characteristics:
            </th>
            <td>
                <ul>
                <li> 
                ${getLabelAndValueForCaseMarkerAttribute(
                    caseMarker,
                    caseMarker.severity,
                    ';')
                }
                </li>
                <li >${getLabelAndValueForCaseMarkerAttribute(
                    caseMarker,
                    caseMarker.victims,
                    'Victims: ',
                    ';')
                } </li>
                <li> ${getLabelAndValueForCaseMarkerAttribute(
                    caseMarker,
                    caseMarker.carsInvolved,
                    'Cars_Involved: ',
                    ';')
                }</li>
                </ul>
            </td>
        </tr>
    </table>
        </div>
       `;
        return content;
    }

    extendSelectionRectangleWithEventCoordinates(e) {
        if (this.leftClickPressed && this.ctrlKeyPressed) {
            if (this.rectangleSelection !== null) {
                this.bounds.extend(e.latLng);
                this.rectangleSelection.setBounds(this.bounds);
            } else {
                this.bounds = new google.maps.LatLngBounds();
                this.bounds.extend(e.latLng);
                this.rectangleSelection = new google.maps.Rectangle({
                    map: this.map,
                    bounds: this.bounds,
                    fillOpacity: 0.15,
                    strokeWeight: 0.9,
                    clickable: false,
                });
            }
        }
    }

    setRectangleSelectionStartingPoint(e) {
        if (this.ctrlKeyPressed) {
            this.leftClickPressed = true;
            this.mouseDownPos = e.latLng;
            this.map.setOptions({
                draggable: false,
            });
        }
    }

    unselectAllMarkers() {
        this.leftClickPressed = false;
        this.mouseDownPos = null;
        if (!!this.rectangleSelection) {
            this.rectangleSelection.setMap(null);
        }
        this.rectangleSelection = null;
        this.selectedMarkers = [];
        for (var key in this.casesMapMarkers) {
            this.casesMapMarkers[key].setIcon(this.defaultMapMarkerIcon);
        }
        this.removeCaseDetailsTraceMarkers();
    }

    private removeCaseDetailsTraceMarkers() {
        if (!!this.caseDetailsTraceMapMarkers) {
            this.caseDetailsTraceMapMarkers.forEach((m) => {
                m.setMap(null);
            });
            this.caseDetailsTraceMapMarkers = [];
        }
        this.removeConnectionPath();
    }

    private removeConnectionPath() {
        if (!!this.allCaseTraceMarkersCoordinates && !!this.tracePathLine) {
            this.tracePathLine.setMap(null);
            this.allCaseTraceMarkersCoordinates = [];
        }
    }


    selectAllMarkersInsideRectangle() {
        if (this.leftClickPressed && this.ctrlKeyPressed) {
            this.leftClickPressed = false;
            if (this.rectangleSelection !== null) {
                for (var key in this.casesMapMarkers) {
                    if (
                        this.rectangleSelection
                            .getBounds()
                            ?.contains(this.casesMapMarkers[key].getPosition())
                    ) {
                        this.addMarkerInSelectionList(
                            this.casesMapMarkers[key]
                        );
                    } else {
                        this.casesMapMarkers[key].setIcon(
                            this.defaultMapMarkerIcon
                        );
                    }
                }
                this.rectangleSelection.setMap(null);
                this.rectangleSelection = null;
            }

            this.map.setOptions({
                draggable: true,
            });
        }
    }


    private addMarkerInSelectionList(mapsMarker) {
        if (!this.isMarkerAlreadySelected(mapsMarker)) {
            this.selectedMarkers.push(mapsMarker);
            mapsMarker.setIcon(this.selectedMapMarkerIcon);
        }
    }

    getCasesMarkersDetailsAndUpdateMap(markers: CaseMarker[]): void {
        this.casesMarkers = markers;
        if (!!this.caseMarkersColor) {
            this.defaultMapMarkerIcon = {
                ...this.defaultMapMarkerIcon,
                url:
                    BasePathToMarkerIcon +
                    this.caseMarkersColor +
                    MarkerIconFormat,
            };
            this.selectedMapMarkerIcon = {
                ...this.selectedMapMarkerIcon,
                url:
                    BasePathToFilledMarkerIcon +
                    this.caseMarkersColor +
                    MarkerIconFormat,
            };
        }
        this.updateMapWithCaseMarkers(markers);
    }

    private isMarkerAlreadySelected(mapsMarker) {
        return this.selectedMarkers.find(
            (m) => m.get('caseId') === mapsMarker.get('caseId')
        );
    }

    private findCaseMarkerInCurrentMarkersList(caseId: number) {
        return this.casesMarkers.find((m) => m.caseId === caseId);
    }

    private hasValidPosition(marker: CaseMarker): boolean {
        return (
            ((!!marker.lat && !!marker.lng) ||
                marker.lat == 0 ||
                marker.lat == 0) &&
            marker.lat <= NORTH_BOUND_LIMIT &&
            marker.lat >= SOUTH_BOUND_LIMIT &&
            marker.lng <= EAST_BOUND_LIMIT &&
            marker.lng >= WEST_BOUND_LIMIT
        );
    }

    private updateMapWithCaseMarkers(markers: CaseMarker[]) {
        this.removeAllMapsMarkers();
        this.casesMapMarkers = markers
            ?.filter(this.hasValidPosition)
            .map((m) => {
                let mapsMarker = new google.maps.Marker({
                    position: { lat: m.lat, lng: m.lng },
                    map: this.map,
                    draggable: !this.isCaseDetailsMode,
                    icon: this.getIconForMarker(m),
                });
                mapsMarker.set('caseId', m.caseId);
                this.setMarkerEventsListeners(mapsMarker);
                return mapsMarker;
            });

        if (!!this.isCaseDetailsMode && !!this.focusOnMarker) {
            this.zoomToLatLngPosition(
                new google.maps.LatLng(
                    this.focusOnMarker.lat,
                    this.focusOnMarker.lng
                )
            );
            this.addLatLngToList(
                this.allCaseTraceMarkersCoordinates,
                this.focusOnMarker.lat,
                this.focusOnMarker.lng
            );
        } else if (!this.isCaseDetailsMode) {
            this.setRectangleRegionMarkerSelectionListener();
            this.zoomToAllMarkers();
        }
    }

    getIconForMarker(m: CaseMarker) {
        return !!this.isCaseDetailsMode &&
            this.focusOnMarker?.caseId === m.caseId
            ? this.selectedMapMarkerIcon
            : this.defaultMapMarkerIcon;
            
    }

    private updateMapWithTracesMarker(markers: CaseMarker[]) {
        if (!!this.casesMapMarkers) {
            markers.forEach((m) => {
                this.caseDetailsTraceMapMarkers.push(
                    new google.maps.Marker({
                        position: { lat: m.lat, lng: m.lng },
                        map: this.map,
                        icon: this.traceMapMarkerIcon,
                    })
                );
                this.addLatLngToList(
                    this.allCaseTraceMarkersCoordinates,
                    m.lat,
                    m.lng
                );
            });
            this.drawLinesAndUpdateMap();
        }
        if (!!this.allCaseTraceMarkersCoordinates) {
            this.zoomToAllCaseTraceMarkersCoordinates();
        }
    }

    private addLatLngToList(arrLatLng: any[], lat: number, lng: number) {
        if (!!arrLatLng && !!lat && !!lng) {
            arrLatLng.push(new google.maps.LatLng(lat, lng));
        }
    }

    private drawLinesAndUpdateMap() {
        this.tracePathLine = new google.maps.Polyline({
            path: this.allCaseTraceMarkersCoordinates,
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 1,
        });
        this.tracePathLine.setMap(this.map);
    }


    private removeAllMapsMarkers() {
        if (!!this.casesMapMarkers) {
            this.casesMapMarkers.forEach((m) => {
                m.setMap(null);
                google.maps.event.clearInstanceListeners(m);
            });
            this.casesMapMarkers = [];
        }
    }

    updateSelectedMarkersStausAndRemoveFromMap() {
        const markersToUpdate: CaseMarker[] = [];
        this.selectedMarkers.forEach((selectedMarker) => {
            let foundMarkerToUpdate: CaseMarker =
                this.findCaseMarkerInCurrentMarkersList(
                    selectedMarker.get('caseId')
                );
            if (this.isMarkerStatusChangeAllowed(foundMarkerToUpdate)) {
                const markerToUpdate = { ...foundMarkerToUpdate };
                markerToUpdate.status = this.newMarkerStatusValue;
                selectedMarker.setMap(null);
                markersToUpdate.push(markerToUpdate);
            } else {
                //set marker to the initial position when dropped outside of the containers
                selectedMarker.setPosition({
                    lat: foundMarkerToUpdate.lat,
                    lng: foundMarkerToUpdate.lng,
                });
            }
        });
        if (!!markersToUpdate.length) {
            this.selectedMarkers = [];
            this.updateMultipleMarkersStatus.emit(markersToUpdate);
        }
    }

    updateSingleMarkerStausAndRemoveFromMap(mapsMarker) {
        let foundMarkerToUpdate: CaseMarker =
            this.findCaseMarkerInCurrentMarkersList(mapsMarker.get('caseId'));
        if (this.isMarkerStatusChangeAllowed(foundMarkerToUpdate)) {
            //update marker status and remove from the map when dropped in the container
            const markerToUpdate = { ...foundMarkerToUpdate };
            markerToUpdate.status = this.newMarkerStatusValue;
            this.updateSingleMarkersStatus.emit(markerToUpdate);
            mapsMarker.setMap(null);
        } else {
            //set marker to the initial position when dropped outside of the containers
            mapsMarker.setPosition({
                lat: foundMarkerToUpdate?.lat,
                lng: foundMarkerToUpdate?.lng,
            });
        }
    }

    zoomToAllMarkers() {
        if (!this.casesMapMarkers?.length) {
            return;
        }
        let bounds = new google.maps.LatLngBounds();
        for (let i = 0; i < this.casesMapMarkers.length; i++) {
            if (this.casesMapMarkers[i].getPosition()) {
                bounds.extend(this.casesMapMarkers[i].getPosition());
            }
        }
        this.map.fitBounds(bounds);
    }

    isMarkerStatusChangeAllowed(foundMarkerToUpdate) {
        return (
            !!this.newMarkerStatusValue &&
            this.newMarkerStatusValue != this.forbiddenStatusChange &&
            !!foundMarkerToUpdate
        );
    }

    zoomToLatLngPosition(latLng: google.maps.LatLng) {
        let bounds = new google.maps.LatLngBounds();
        bounds.extend(latLng);
        this.map.fitBounds(bounds);
    }

    zoomToAllCaseTraceMarkersCoordinates() {
        if (!this.allCaseTraceMarkersCoordinates?.length) {
            return;
        }
        let bounds = new google.maps.LatLngBounds();
        for (let i = 0; i < this.allCaseTraceMarkersCoordinates.length; i++) {
            if (!!this.allCaseTraceMarkersCoordinates[i]) {
                bounds.extend(this.allCaseTraceMarkersCoordinates[i]);
            }
        }
        this.map.fitBounds(bounds);
    }
}