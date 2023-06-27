import { AboutAPP } from 'src/app/common/about-page-interfaces';
import { getAboutApp, getAboutAppFailure, getAboutAppSucces } from '../../actions/about-page/about-page.actions';
import { aboutAppReducer, initialState } from './about-page.reducer';
import packageJson from '../../../../../package.json';

describe('AboutPage Reducer', () => {

    const aboutApp: AboutAPP = {
        releaseNotes: [{
            releaseVersion: "1.0.0",
            issueType: "test",
            issueId: "123",
            issueSummary: "some text",
        }],
        beBuildVersion: {buildNumber:"1.0.1"},
        feVersion: {version: packageJson.version},
        // error: 'err',
    };
    
    it('should setup the store', () => {
        const action = {} as any;

        const result = aboutAppReducer(initialState, action);

        expect(result).toBe(initialState);
    });

    it('should set AboutApp', () => {
        const action = getAboutAppSucces({ aboutApp: aboutApp });
        const state = aboutAppReducer(initialState, action);
        expect(state.aboutApp).toEqual(aboutApp);
    });

    it('should set error', () => {
        let errMsg = 'asd';
        const action = getAboutAppFailure({ error: errMsg });
        const state = aboutAppReducer(initialState, action);
        expect(state.error).toEqual(errMsg);
    });

});
