import { Field } from './field';

describe('Field', () => {
  it('should create an instance', () => {
    expect(new Field({x:0,y:0})).toBeTruthy();
  });
});
