const Storage = artifacts.require("Storage");
let storage;

contract ("Advanced Storage", () =>{

    beforeEach ( async ()=>{
         storage = await Storage.deployed();
         await storage.add(10);
         await storage.add(5);
    })
    it ("should add the input", async () =>{
        let input =8;
        await storage.add(input);
        let result = await storage.ids(0);
        assert(result==input, "Accepts the input value")

     })

     it ("give return the entire array", async () =>{
        let test = await storage.getAll();
        let result =  storage.ids;
        assert(result==test, "returns the array")


     
})

})
