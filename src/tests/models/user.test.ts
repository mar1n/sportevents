import User from "../../models/user";


describe('User', () => {
    it('should work', () => {
        const user = new User();
        expect(user.test()).toEqual(7);
    });
})