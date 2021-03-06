import React from 'react'
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import {AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet} from '../src/lib/MarinakutCommons'
import {ProfileRelationsBoxWrapper} from '../src/components/ProfileRelations'


function ProfileSidebar(propriedades){
  return(
    <Box as="aside" >
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: "8px"}}/>
      <hr/>
      <p>
        <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`}>
          @{propriedades.githubUser}
        </a>
      </p>
      <hr/>
      <AlurakutProfileSidebarMenuDefault/>
    </Box> 
  )
}

function ProfileRelationBox(propriedades){
  return(
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {propriedades.title} 
        ({propriedades.items.length})
      </h2>
      <ul>
        {/*seguidores.map((itemAtual) => {
          return (
            <li key={itemAtual.id}>
              <a href={`https://github.com/${itemAtual}.png`}>
                <img src={`https://github.com/${itemAtual}.png`} />
                <span>{itemAtual}</span>
              </a>
            </li>
          )
        })*/}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}


export default function Home() {
  //const [comunidades, setComunidades] = React.useState([`Alurakut`])
  
  const [comunidades, setComunidades] = React.useState([{
    id: '2u3y283283t82t',
    title: 'A vida eh uma life',
    image: 'https://einvestidor.estadao.com.br/wp-content/uploads/sites/715/2021/04/whatsappimage20210428at163631_280420214958.jpeg'
  }]);
  const githubUser = 'mlrl2';
  
  const pessoasFavoritas = 
  ['mlrl2',
  'omariosouto',
  'juunegreiros',
  'peas',
  'lhaisrs'
  ]
  
  // Persistir dados de comunidade fazendo integração com APIs
  // usa o serviço do DatoCMS

  // step 0: Antes de tudo fazer meu front se comunicar com a API do GitHub

  //ReactuseEffect faz com que o React aguarde o retorno das funcoes ate que recba uma resposta completa do server
  
  // No ReactuseEffect passo um array vazio no metodo para que ele apenas execute uma vez.
  const [seguidores, setSeguidores] = React.useState([]);

  React.useEffect(function(){
    fetch('https://api.github.com/users/peas/followers')
    .then(function(respostaDoServidor){
      return respostaDoServidor.json();
    })
    .then(function(respostaCompleta){
      {/*console.log(respostaCompleta);*/}
      setSeguidores(respostaCompleta);
    })
  }, [])
    
  // step 1:Criar os amigos do orkut só que vou carregar eles do Github


  return (
   <> 
      <AlurakutMenu/>
      <MainGrid>
        <div className="profileArea" style={{gridArea:'profileArea'}}>
          <ProfileSidebar githubUser={githubUser}/>
        </div>
        <div className="welcomeArea" style={{gridArea:'welcomeArea'}}>
          <Box >
              <h1>Bem vindo</h1>
              <OrkutNostalgicIconSet/>
          </Box> 
          
          <Box> 
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={function handleCriaComunidade(e){
              e.preventDefault();
                //console.log(e);
              const dadosDoForm = new FormData(e.target);

              const comunidade = {
                id: new Date().toISOString,
                title: dadosDoForm.get('title'),
                image: dadosDoForm.get('image')
              }
              
              const comunidadesAtualizadas = [...comunidades, comunidade];
              setComunidades(comunidadesAtualizadas);
                
            }}>
              <div>
                <input
                placeholder="Qual vai ser o nome da sua comunidade?"
                name="title"
                aria-label="Qual vai ser o nome da sua comunidade?"
                type="text"
                />
              </div>
              <div>
                <input
                placeholder="Qual vai ser a imagem da sua comunidade, cola aí o link!"
                name="image"
                aria-label="Qual vai ser a imagem da sua comunidade, cola aí o link!"
                type="text"
                />
              </div>

              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{gridArea:'profileRelationsArea'}}>
          <ProfileRelationBox title="Seguidores" items={seguidores}>  

          </ProfileRelationBox>

          <ProfileRelationsBoxWrapper>
            <h2 className= "smallTitle">Comunidades ()</h2>
            <ul>
              {comunidades.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`/users/${itemAtual.title}`}>
                      <img src={itemAtual.image} />
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul> 

          </ProfileRelationsBoxWrapper>
          
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Pessoas da comunidade ({pessoasFavoritas.length})</h2>
            <ul>
              {pessoasFavoritas.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`/users/${itemAtual}`}>
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                )
              })}
            </ul> 
          
          </ProfileRelationsBoxWrapper> 
        </div>      
      </MainGrid>
  </>
  )
}
