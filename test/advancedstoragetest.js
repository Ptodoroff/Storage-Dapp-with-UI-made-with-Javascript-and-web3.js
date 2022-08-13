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
        let result = await storage.ids(2);
        assert(result==input, "Accepts the input value")

     })

     it ("should return the entire array", async () =>{
        let rawIds = await storage.getAll();
        let result =  rawIds.map(id=> id.toNumber());                       // created a copy of the array via the map method. I use the toNumber method because truffle uses BN (big number)
        assert.deepEqual(result,[10,5,8,10,5], "returns the array")         // I used deepequal isntead of assert.equal, because with the latter, the copared variables must be exactly the same. i.e assert.equal will see if I am comparing the exact same elements of the exact same array. assert.deepequal will check only if the value of the elements is identical

     });

     it ("should return a specific element", async () =>{
        let input = await storage.get(0)
        assert(input==10, "the chosen element is returned");
     })

     it ("should return the array length", async () =>{
        let length = await storage.arrayLength()
        assert(length==9, "the chosen element is returned");
     })

     
})


