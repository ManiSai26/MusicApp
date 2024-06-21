import { doc, getDoc } from 'firebase/firestore';
import './App.css';
import List from "./data";
import db from "./firebase";
import {useEffect, useRef, useState} from 'react';
// import Play from './assets/play-button.svg';
function App() {
  let [current,setCurrent] =useState(0);
  const [url,setUrl] = useState('');
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const[data,setData] = useState([]);
  useEffect(()=>{
    if(current!=0)
      {
        var res ="";
        data.forEach((elem)=>{
          if(elem.id===current) res = elem.url;
        })
        setUrl(res);
        setTimeout (()=>{
          audioRef.current.play();
          setDuration(audioRef.current.duration);
          setCurrentTime(0);
          setTimeout(()=>{setCurrentTime(-1)},5000);
        },1000)
      }
      else
      {
        audioRef.current.pause();
      }
  },[current]);
  useEffect(()=>{
    // console.log(current);
    if(current!=0)
      {
        setTimeout(()=>{setCurrentTime(audioRef.current.currentTime);},1000);
      }
  },[currentTime]);
  useEffect(()=>{
    var arr =[]
    db.collection("Music")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((element) => {
                    var data = element.data();
                    arr =[...arr , data];
                });
                setData(arr);
            }).catch((err)=> console.log(err));
  },[]);
  return (
    <div className=' flex w-screen h-screen bg-black flex-col'>
      <audio ref={audioRef} src={url} />
      {data.map((elem)=>{
        console.log(data);
        return <div className='flex flex-row  my-5 py-3 containercolor h-min w-full items-center' style={{justifyContent:'flex-start'}}>
        <div className='textcolor text-5xl mr-10'>
         {elem.id}
        </div>
        <div className='mr-16'>
          <img className='image' src={elem.artwork}/>
        </div>
        <div className='textcolor text-5xl mr-80'>
          <span>{elem.title}</span>
        </div>
        <div className='textcolor text-xl mr-44'>
          <span>{elem.artist}</span>
        </div>
        <div className='text-white background p-1 rounded-sm cursor-pointer mr-16' onClick={()=>{(current!== elem.id)? setCurrent(elem.id):setCurrent(0);}}>
          <span>{current===elem.id? 'Pause':'Play'}</span>
        </div>
        <div className='textcolor text-xl'>
          <span>{current===elem.id ? `${Math.floor(currentTime)} /${Math.floor(duration)}`:''}</span>
        </div>
      </div>
      })}
    </div>
  );
}

export default App;
