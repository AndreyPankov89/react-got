import React from 'react';
import App from './app';
import {shallow} from 'enzyme';

describe('Testing <App/>', () => {
    const item = shallow(<App/>);
    describe('testing shap & state', () =>{
        it('App have rendered correctly', () => {
            expect(item).toMatchSnapshot();
        });

        it("App state error is false", () =>{
            expect(item.state().error).toBeFalsy();
        })

        it("App state visible is false", () =>{
            expect(item.state().visible).toBeFalsy();
        })

        it("App state selectedChar is null", () =>{
            expect(item.state().selectedChar).toBeNull();
        })

        it("App state text is 'on'", () =>{
            expect(item.state().visibleButtonText).toEqual('on');
        })
    });
    describe('Handlers tests', () => {
        it('testing onCharSelected', () => {
            item.instance().onCharSelected
            (1);
            expect(item.state().selectedChar).toEqual(1)
        });
        it('testing toggleVisible', () => {
            item.instance().toggleVisible();
            expect(item.state().visible).toBeTruthy();
            expect(item.state().visibleButtonText).toEqual('off');
        });
        
    })
})