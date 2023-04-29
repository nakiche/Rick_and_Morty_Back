const app = require('../routes/server.js');
const session = require('supertest-as-promised');
const agent = session(app);
const utils = require('../utils/utils.js');


describe('Test de RUTAS Rick&Morty', () => {
   beforeEach(function () {
      utils.reset();
   });

  const ats = [{
    id:1,
    name:'Rick Sanchez',
    species:'Human',
    gender:'Male',
    image:'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
  },
  {
    id:2,
    name:'Morty Smith',
    species:'Human',
    gender:'Male',
    image:'https://rickandmortyapi.com/api/character/avatar/2.jpeg'
  }]




//------------------------------------------------------------
	describe('GET rickandmorty/character/{id}', () => {
    it('responds with 200', () => agent.get('/rickandmorty/character/1').expect(200));
    it('Responde un objeto con las propiedades: "id", "name", "species", "gender" e "image"',  () =>
        agent.get('/rickandmorty/character/1')
        .then((res) => {
        let keys =  Object.keys(res.body)
        expect(keys).toEqual(["id", "name", "species", "gender", "image"])
        }));
	it('Si hay un error responde con status: 400', () => agent.get('/rickandmorty/character/1412').expect(400));
	});

//-----------------------------------------------------------------
	describe('GET rickandmorty/detail/{id}', () => {
    
    it('responds with 200', () => agent.get('/rickandmorty/detail/1').expect(200));
    it('Responde un objeto con las propiedades: "id", "name", "species", "gender" e "image"',  () =>
        agent.get('/rickandmorty/detail/1')
        .then((res) => {
         let objeto = {
               id:1,
               name:'Rick Sanchez',
               species:'Human',
               gender:'Male',
               image:'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
               tatus:'Alive',
               origin:{
               			name:'Earth (C-137)',
               			url:'https://rickandmortyapi.com/api/location/1'
            			}
            	}		
        expect(res.body).toEqual(objeto)
        }));
	it('Si hay un error responde con status: 400', () => agent.get('/rickandmorty/detail/1412').expect(400));
	});

//------------------------------------------------------
	describe('GET rickandmorty/fav', () => {
	//arr.push(ats[0], ats[1])
  
   it('Si hay un error responde con status: 404', () => 
    agent.get('/rickandmorty/fav').expect(404));
    

  	it('responds with 200', () => {
      utils.fav.push(ats[0])
      agent.get('/rickandmorty/fav').expect(200)
    });

     it('Responde un objeto con los favoritos',  () =>{
        //return agent
        utils.fav.push(ats[0], ats[1]) 
        agent.get('/rickandmorty/fav')
        //.get('/rickandmorty/fav')
        .then((res) => {
         expect(res.body).toEqual([
              {
              id:1,
              name:'Rick Sanchez',
              species:'Human',
              gender:'Male',
              image:'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
              },
              {
                id:2,
                name:'Morty Smith',
                species:'Human',
                gender:'Male',
                image:'https://rickandmortyapi.com/api/character/avatar/2.jpeg'
              }
            ])
        })
      });

   })
 
 //------------------------------------------------- 
  describe('POST /rickandmorty/fav', () => {
  //arr.push(ats[0], ats[1]) 
  it('responds with 200 and confirmation message', () => 
    agent.post('/rickandmorty/fav')
    .send({
                id:1,
               name:'Rick Sanchez',
               species:'Human',
               gender:'Male',
               image:'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
               tatus:'Alive',
               origin:{
                    name:'Earth (C-137)',
                    url:'https://rickandmortyapi.com/api/location/1'
                  }
      })
    .expect(200)
    .expect('Content-Type', /json/)
      .expect(function (res) {
        expect(res.body).toEqual('los datos se guardaron correctamente')
      })
    );
  it('Si no hay responde con status: 400 y un mensaje', () => 
    agent.post('/rickandmorty/fav')
    .send({})
    .expect(400)
    .expect('Content-Type', /json/)
      .expect(function (res) {
        expect(res.body).toEqual('no hay body')
      })
    );
  })

//------------------------------------------------- 

describe('DELETE /rickandmorty/fav', () =>{
    let id = 2
    it('responde con status: 201 ', () => 
    //utils.fav.push(ats[0], ats[1],ats[0])   
    agent.delete(`/rickandmorty/fav/${id}`).expect(201)) // {

    it('responde con mensaje indicando el id ', () =>  
    agent.delete(`/rickandmorty/fav/${id}`).expect(function (res) {
        expect(res.body).toEqual(`se eliminó correctamente el id:${id}`)
      })); 
  })  

});