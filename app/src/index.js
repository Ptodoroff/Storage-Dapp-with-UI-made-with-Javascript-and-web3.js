import Web3 from'web3';
import Storage from '../../build/contracts/Storage.json';

let web3;
let storage;


const initWeb3 = () => {
    return new Promise((resolve, reject) => {
      if(typeof window.ethereum !== 'undefined') {
        const web3 = new Web3(window.ethereum);
        window.ethereum.enable()
          .then(() => {
            resolve(
              new Web3(window.ethereum)
            );
          })
          .catch(e => {
            reject(e);
          });
        return;
      }
      if(typeof window.web3 !== 'undefined') {
        return resolve(
          new Web3(window.web3.currentProvider)
        );
      }
      resolve(new Web3('http://localhost:9545'));
    });
  };
  


const initContract =  () => {                                // this is the fn that will initialise the instance of the contract
    
    return  new web3.eth.Contract(Storage.abi,Storage.networks[5777].address)
}



const  initApp = () => {                                     //initialises the app
    let $addData=document.getElementById("addData");
    let $data = document.getElementById("data");
    let accounts =[];

    web3.eth.getAccounts()
    .then(_accounts=>{
        accounts=_accounts;
        return Storage.methods.getAll().call()
    })
    .then((result)=>{
        $data.innerHTML= result.join(', ');
    })

    $addData.addEventListener('submit', (event) =>{
        event.preventDefault();
        Storage
        .methods
        .add(event.target.elements[0].value)
        .send({from:accounts[0]})
        .then( ()=> {
            return Storage.methods
            .getAll()
            .call()
        })

    })
    
    

}

document.addEventListener('DOMContentLoaded', () =>{
    initWeb3()
    .then(_web3 => {
        web3=_web3;
        storage = initContract();
        initApp();
    })
    .catch((e)=>console.log(e.message))
})