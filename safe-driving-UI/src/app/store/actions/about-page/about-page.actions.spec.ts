import { AboutAPP } from 'src/app/common/about-page-interfaces';
import * as fromAboutPage from './about-page.actions';

describe('getAboutApp', () => {
    it('should call getAboutAppDetails action', () => {
        expect(fromAboutPage.getAboutApp().type).toBe(
            fromAboutPage.AboutAppActionTypes.GET_ABOUT_APP
        );
    });

    it('should call getAboutAppDetailsSucces action', () => {
        let aboutApp: AboutAPP;
        expect(fromAboutPage.getAboutAppSucces({ aboutApp }).type).toBe(
            fromAboutPage.AboutAppActionTypes.GET_ABOUT_APP_SUCCESS
        );
    });

    it('should call getAboutAppFailure action', () => {
        expect(
            fromAboutPage.getAboutAppFailure({ error: { message: 'test' } })
                .type
        ).toBe(fromAboutPage.AboutAppActionTypes.GET_ABOUT_APP_FAILURE);
    });
});
