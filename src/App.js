
import topBtn from './icones/topo-pag.svg';
import './App.css';
import { useRef, useState } from 'react';
import { NavBar } from './components/navbar/NavBar'
import { NavBarMobile } from './components/navbar/NavBarMobile'


function App() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [data, setData] = useState("");
  const [userList, setUserList] = useState([]);
  const [validEmail, setValidEmail] = useState(true);
  const [validData, setValidData] = useState(true);
  const [validTel, setValidTel] = useState(true);
  const [ pages, setPages] = useState(1);
  const [activePage, setActivePage] = useState(0);
  const [activeIdx, setActiveIdx] = useState(0);

  const homeRef = useRef();
  const cadastrarRef = useRef();
  const listRef = useRef();
  const footerRef = useRef();

  const refs = [ homeRef, cadastrarRef, listRef, footerRef];


  const handleSubmit = event => {
    event.preventDefault();

    console.log(userList);
  };

  const ValidateEmail = (email)=>{
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    setValidEmail(emailRegex.test(email));
    return emailRegex.test(email)
  };

  const ValidateDate = (date) =>{
    const dateRegex = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
    setValidData(dateRegex.test(date));
    return dateRegex.test(date);
  }
  
  const ValidateTel = (tel) =>{
    const telRegex = /^1\d\d(\d\d)?$|^0800 ?\d{3} ?\d{4}$|^(\(0?([1-9a-zA-Z][0-9a-zA-Z])?[1-9]\d\) ?|0?([1-9a-zA-Z][0-9a-zA-Z])?[1-9]\d[ .-]?)?(9|9[ .-])?[2-9]\d{3}[ .-]?\d{4}$/
    setValidTel(telRegex.test(tel))
    return telRegex.test(tel)
  }

  const changePage = (num) =>{
    if(num>0 &&activePage + num < pages){
      console.log(activePage+num)
      setActiveIdx(0)
      setActivePage(activePage+num)
      
    }
    else if(num<0 &&activePage + num >=0){
      setActiveIdx(0)
      setActivePage(activePage+num)
    }
  }

  const names = [];
  for(let i=activePage*4; i<4*activePage + 4; i++){
    console.log(userList.length)
    console.log(i);
    if(userList.length>i){
      names.push(userList[i].nome);
    }
    else{
      names.push('');
    }
  }

  const tels = [];
  for(let i=activePage*4; i<4*activePage + 4; i++){
    if(userList.length>i){
      tels.push(userList[i].tel);
    }
    else{
      tels.push('');
    }
  }

  const emails = [];
  for(let i=activePage*4; i<4*activePage + 4; i++){
    if(userList.length>i){
      emails.push(userList[i].email);
    }
    else{
      emails.push('');
    }
  }

  const datas = [];
  for(let i=activePage*4; i<4*activePage + 4; i++){
    if(userList.length>i){
      datas.push(userList[i].data);
    }
    else{
      datas.push('');
    }
  }


  return (
    <div className="App">
      <header className="App-header">
        <div className='navbar-mobile'><NavBarMobile navHeader={refs}/></div>
        <div className='navbar'><NavBar navHeader={refs}/></div>

      </header>
      <body>
          <div id='idx-img' ref={homeRef} className='idx-img'>
            <div class = 'idx-text'>
              <div className='estagio'>ESTÁGIO</div>
              <div>PROVA DE SELEÇÃO</div>
            </div>
          </div>

          <div id='register' ref={cadastrarRef} className='register'>
            <form className='register-form' onSubmit={handleSubmit}>
              <div className='cadastro-text'>
                <p>CADASTRO</p>
              </div>

              <div className='text-input-div'>
                  Nome
                  <input className='text-input'
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
              </div>
              
              <div className='text-input-div' style={{backgroundColor: validEmail === true ? 'transparent': '#D008'}}>
                  E-mail
                  <input className='text-input'
                    type="text" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
              </div>

              <div className='text-input-div' style={{backgroundColor: validData ? 'transparent': '#D008'}}>
                  Nascimento
                  <input className='text-input'
                    type="text" 
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                  />
              </div>
              
              <div className='text-input-div' style={{backgroundColor: validTel ? 'transparent': '#D008'}}>
                  Telefone
                  <input className='text-input'
                    type="text" 
                    value={tel}
                    onChange={(e) => setTel(e.target.value)}
                  />
              </div>
              
              <div className='cadastrar-btn-div'>
                <button className='cadastrar-btn' onClick={( )=>{
                  let valEmail = ValidateEmail(email);
                  let valData = ValidateDate(data);
                  let valTel = ValidateTel(tel);
                  if(valEmail && valData && valTel){
                    if((userList.length + 1 )>4*pages){
                      setPages(pages + 1);
                    }
                    setUserList([...userList, {'nome':name, 'email':email, 'data':data, 'tel':tel}]);
                    console.log(userList);
                  }
                }}>CADASTRAR</button>
              </div>
              
            </form>
          </div>

          <div id='list' ref={listRef} className='list'>
            <div className="list-title">LISTA DE CADASTROS</div>
            <div className="board">
              <table>
                <tr id="row1">
                  <td className="square-num"></td>
                  <td className="square v table-head"> <text style={{color:'#012d51'}}>NOME</text></td>
                  <td className="square table-head"> <text style={{color:'#012d51'}}>E-MAIL</text></td>
                  <td className="square v table-head"><text style={{color:'#012d51'}}>NASCIMENTO</text></td>
                  <td className="square table-head"><text style={{color:'#012d51'}}>TELEFONE</text></td>
                </tr>
                <tr id="row2">
                  <td className="square-num h table-number"><text style={{color:'#012d51'}}>{4*activePage+1}</text></td>
                  <td className="square v h"><text style={{color:'#808080'}}>{names[0]}</text></td>
                  <td className="square h"><text style={{color:'#808080'}}>{emails[0]}</text></td>
                  <td className="square v h"><text style={{color:'#808080'}}>{datas[0]}</text></td>
                  <td className="square h"><text style={{color:'#808080'}}>{tels[0]}</text></td>
                </tr>
                <tr id="row3">
                  <td className="square-num table-number"><text style={{color:'#012d51'}}>{4*activePage+2}</text></td>
                  <td className="square v"><text style={{color:'#808080'}}>{names[1]}</text></td>
                  <td className="square"><text style={{color:'#808080'}}>{emails[1]}</text></td>
                  <td className="square v"><text style={{color:'#808080'}}>{datas[1]}</text></td>
                  <td className="square"><text style={{color:'#808080'}}>{tels[1]}</text></td>
                </tr>
                <tr id="row4"> 
                  <td className="square-num h table-number"><text style={{color:'#012d51'}}>{4*activePage+3}</text></td>
                  <td className="square v h"><text style={{color:'#808080'}}>{names[2]}</text></td>
                  <td className="square h"><text style={{color:'#808080'}}>{emails[2]}</text></td>
                  <td className="square v h"><text style={{color:'#808080'}}>{datas[2]}</text></td>
                  <td className="square h"><text style={{color:'#808080'}}>{tels[2]}</text></td>
                </tr>
                <tr id="row5">
                  <td className="square-num table-number"><text style={{color:'#012d51'}}>{4*activePage+4}</text></td>
                  <td className="square v"><text style={{color:'#808080'}}>{names[3]}</text></td>
                  <td className="square"><text style={{color:'#808080'}}>{emails[3]}</text></td>
                  <td className="square v"><text style={{color:'#808080'}}>{datas[3]}</text></td>
                  <td className="square"><text style={{color:'#808080'}}>{tels[3]}</text></td>
                </tr>
              </table>
              <div className='page-btn' style={{display:pages > 1 ? 'flex' : 'none'}}>
                <div><button className='pg-btn' onClick={(e) => changePage(-1)}>prev</button></div>
                <div><button className='pg-btn' onClick={(e) => changePage(1)}>next</button></div>
              </div>
              <div className='home-btn'>
                <a href='#idx-img'><img src={topBtn} className="top-btn" alt="Go to Top"/></a>
                
              </div>
            
            
            <div className='table-mobile'>
                <div className='list-btns'>
                    <button className='list-btn' onClick={()=>setActiveIdx(0)}
                     style={{borderColor: activeIdx%4==0 ? '#29abe2' : '#808080'}}>
                      <text style={{color:'#012d51'}}>{4*activePage+1}</text>
                    </button>
                    <button className='list-btn' onClick={()=>setActiveIdx(1)}
                    style={{borderColor: activeIdx%4==1 ? '#29abe2' : '#808080'}}>
                      <text style={{color:'#012d51'}}>{4*activePage+2}</text>
                    </button>
                    <button className='list-btn' onClick={()=>setActiveIdx(2)}
                    style={{borderColor: activeIdx%4==2 ? '#29abe2' : '#808080'}}>
                      <text style={{color:'#012d51'}}>{4*activePage+3}</text>
                    </button>
                    <button className='list-btn right' onClick={()=>setActiveIdx(3)}
                    style={{borderColor: activeIdx%4==3 ? '#29abe2' : '#808080'}}>
                      <text style={{color:'#012d51'}}>{4*activePage+4}</text>
                    </button>
                </div>
                <div className='list-board'>
                  <div className='tbl-line top'>
                    <text className='margin-right'>Nome</text>
                    <text style={{color:'#808080', textOverflow:'ellipsis'}}>{names[activeIdx]}</text>

                  </div>
                  <div className='tbl-line'>
                    <text className='margin-right'>E-MAIL</text>
                    <text style={{color:'#808080', textOverflow:'ellipsis'}}>{emails[activeIdx]}</text>
                  </div>
                  <div className='tbl-line'>
                    <text className='margin-right'>NASC.</text>
                    <text style={{color:'#808080', textOverflow:'ellipsis'}}>{datas[activeIdx]}</text>
                  </div>
                  <div className='tbl-line bot'>
                    <text className='margin-right'>TEL.</text>
                    <text style={{color:'#808080', textOverflow:'ellipsis'}}>{tels[activeIdx]}</text>
                  </div>
                </div>
            </div>
            </div>
          </div>

          <div id='footer' ref={footerRef} className='footer'>
            <div className='footer-text'>
              <p>Fernando Tonucci de Cerqueira Oliveira</p>
              <p>fernandotnco@hotmail.com</p>
              <p>(31) 9 9525-2727</p>
              <p>Universidade Federal de Minas Gerais</p>
            </div>
          </div> 
      </body>
    </div>
  );
}

export default App;
