import React,{useState,useEffect,useRef} from 'react'
import {saveAs} from 'file-saver'
import domtoimage from 'dom-to-image';
export default function Form(){
    const[topText,setTopText] = useState('');
    const[bottomText,setBottomText] = useState('');
    const[memes,setMemes] = useState();
    const[memeImage,setMemeImage] = useState(false);
    const [valueTop, setValueTop] = useState("");
    const [valueBottom, setValueBottom] = useState("");
   
    async function getMemeApi(){
        try{
            const response = await fetch('https://api.imgflip.com/get_memes');
            const allMemes = await response.json();
            setMemes(allMemes.data.memes);
            setMemeImage(allMemes.data.memes[2].url);
    }catch(error){
        console.error(error);
    }
    }
    useEffect(()=>{
        getMemeApi()
    },[])
    const handleClick =()=>{
        
    const randomIndex = Math.floor(Math.random() * memes.length);
    setMemeImage(memes[randomIndex].url);
    }
    const resetForm = ()=> {
        setMemeImage('https://placeholder.com/350');
        setTopText('');
        setBottomText('');
        setValueTop('')
        setValueBottom('')
    }
    function uploadImage(file){
        setMemeImage(URL.createObjectURL(file));
    }
    const handleTopText = (event)=>{
        setTopText(event.target.value)
    }
    const handleBottomText=(event)=>{ setBottomText(event.target.value)
    };
    const onInput = (e) => setValueTop(e.target.value);
    const onInputBottom = (e) => setValueBottom(e.target.value);
    async function download(){
   
        try{
           const blob = await domtoimage.toBlob(document.getElementById("memeImage"))
           saveAs(blob, 'my-node.png');
        }catch(error){
    console.error(error);
        }
    }
    
    return(
        <div>
            <div className="form-class">
                <div className="form">
                    <div className='input-container'>
                        <input type= "text" className="input-text" placeholder="Enter top Text" onChange={handleTopText} value={valueTop} onInput={onInput}/>
                        <input type= "text" className="input-text" placeholder="Enter bottom Text" onChange={handleBottomText} value={valueBottom} onInput={onInputBottom}/>
                    </div>
                        <button className='btn'onClick={handleClick}>
                            Get a new random meme
                        </button>
                    <p className='upload-meme'> Upload your own meme</p>
                    <div className = "buttons">
                    <input type="file" className='btn1' name="uploadimage" onChange={event=>uploadImage(event.target.files[0])} />
                    <button className='btn1' onClick={download}>Download</button> &nbsp; &nbsp;
                    <button className='btn1' onClick={resetForm}>Reset</button>
                    </div>
                </div>
            </div>
            <div className='image'>
                    <img  src={memeImage} id="memeImage" className='memeImg' alt="meme" />
                    <div className="top">{topText}</div>
                    <div className="bottom">{bottomText}</div> <br />
            </div>

        </div>
    )
}