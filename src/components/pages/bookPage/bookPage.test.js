import React from 'react';
import {BookPage} from './bookPage';
import {shallow} from 'enzyme';

describe('Testing <BookPage/>', () => {
    const item = shallow(<BookPage/>);
    describe('testing shap & state ', () =>{
        it('BookPage have rendered correctly', () => {
            expect(item).toMatchSnapshot();
        })
        it("BookPage state error is false", () =>{
            expect(item.state().error).toBeFalsy();
        })
    });
    describe('Handlers tests', () => {
        
        it('testing onError', () => {
            item.instance().onError({message:"2"});
            expect(item.state().error).toBeTruthy();
            expect(item.state().loading).toBeFalsy();
            expect(item.state().errorCode).toBe('2')
        });
        
    })
})