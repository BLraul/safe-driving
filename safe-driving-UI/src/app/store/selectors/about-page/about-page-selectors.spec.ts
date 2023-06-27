import { AboutAPP } from 'src/app/common/about-page-interfaces';
import * as fromAboutPage from '../../reducers/about-page/about-page.reducer';
import { beBuildVersion, releaseNotes, selectState } from './about-page-selectors';
import packageJson from '../../../../../package.json';

describe('AboutPage Selectors', () => {
    const aboutApp = {
        aboutApp: {
            releaseNotes: [{
                releaseVersion: "1.0.0",
                issueType: "test",
                issueId: "123",
                issueSummary: "some text",
            }],
            beBuildVersion: {buildNumber:"1.0.1"},
            feVersion: {version: packageJson.version},
        },
        error: 'err',
    };



    it('should select the feature state', () => {

        const result = selectState({
            [fromAboutPage.aboutAppFeatureKey]: aboutApp,
        });

        expect(result).toEqual(aboutApp);
        expect(releaseNotes.projector(aboutApp)).toBeTruthy();
        expect(beBuildVersion.projector(aboutApp)).toBeTruthy();

    });
});
