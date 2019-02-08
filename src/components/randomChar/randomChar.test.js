import React from 'react';
import RandomChar from './randomChar';
import {shallow} from 'enzyme';


describe('Testing <RandomChar/>', () => {
        const char = shallow(<RandomChar/>);
    describe('testing shap & state', () =>{
        it('RandomChar have rendered correctly', () => {
            expect(char).toMatchSnapshot();
        })
    
        it("RandomChar state char is empty object", () =>{
            expect(char.state().char).toBeObject();
        })
        it("RandomChar state loading is true", () =>{
            expect(char.state().loading).toBeTruthy();
        })
        it("RandomChar state error is false", () =>{
            expect(char.state().error).toBeFalsy();
        })
    });
    describe('Handlers tests', () => {
        it('testing onCharLoaded', () => {
            char.instance().onCharLoaded();
            expect(char.state().loading).toBeFalsy()
        });
        it('testing onError', () => {
            char.instance().onError({message:""});
            expect(char.state().loading).toBeFalsy()
            expect(char.state().error).toBeTruthy()
        });
        
    })
})