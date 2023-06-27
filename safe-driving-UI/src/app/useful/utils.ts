import { environment } from 'src/environments/environment';
import { CaseMarker } from './interfaces';

export function getLabelAndValueForCaseMarkerAttribute(
    caseMarker: CaseMarker,
    value: any,
    label?: string,
    semicolon?: string
): string {
    let arrayObj = Object.values(caseMarker);
    if (!!value && arrayObj.includes(value)) {
        if (label && semicolon) {
            return label + value.toString() + semicolon;
        } else {
            return value;
        }
    } else {
        return '';
    }
}

export function getSeriesAndVariantOrModelNameAtributes(
    caseMarker: CaseMarker,
    ...value: string[]
) {
    let arrayObj = Object.values(caseMarker);
    if (!!value && arrayObj.includes(value[0]) && arrayObj.includes(value[1])) {
        return value[0] + '/' + value[1];
    } else {
        return caseMarker.modelName;
    }
}

export function setCommaSeparatedValuesInArray(boolArray: boolean[]): String {
    let retVal:String = '';
    boolArray.forEach((el, index)=>{
        if (!!el){
            retVal += index+1 + ','
        }
    })
    retVal = retVal.substring(0, retVal.length - 1);
    return retVal
}

export function countSetValuesInBoolArray(boolArray: boolean[]): number {
    return boolArray.filter(Boolean).length;
}


