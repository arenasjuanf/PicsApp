import Server from "../classes/server"

test("server port must be 3000", async () => {
    
    expect(new Server().port).toEqual(3000);

    
})