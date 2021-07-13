import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import {AlurakutMenu, OrkutNostalgicIconSet} from '../src/lib/MarinakutCommons'
import {ProfileRelationsBoxWrapper} from '../src/components/ProfileRelations'


function ProfileSidebar(propriedades){
  return(
    <Box>
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: "8px"}}/>
    </Box> 
  )
}
export default function Home() {
  const githubUser = 'mlrl2';
  const pessoasFavoritas = 
  ['mlrl2',
  'omariosouto',
  'juunegreiros',
  'peas'
  ]
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
              <OrkutNostalgicIconSet>

              </OrkutNostalgicIconSet>
          </Box> 
        </div>
        <div className="profileRelationsArea" style={{gridArea:'profileRelationsArea'}}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Pessoas da comunidade ({pessoasFavoritas.length})</h2>
            <ul>
              {pessoasFavoritas.map((itemAtual) => {
                return (
                  <li key={itemAtual}>
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
