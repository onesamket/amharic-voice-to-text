import { useState } from 'react';
import { useSpeechRecognition } from 'react-recipes';
import { Copy, RotateCw, Check, Trash2, AudioLines, Pause } from 'lucide-react';

function App() {
  const [value, setValue] = useState('');
  const [coping, setCoping] = useState(false);
  const [, setEnded] = useState(false);

  const onResult = (result) => setValue(result.join(''));
  const onEnd = () => setEnded(true);

  const { listen: startListen, listening, stop: stopHandler, supported } = useSpeechRecognition({
    onEnd,
    onResult,
  });

  const onCopyHandler = () => {
    setCoping(true);
    navigator.clipboard.writeText(value);

    setTimeout(() => {
      setCoping(false);
    }, 600);
  };
  if (!supported) {
    return 'Speech Recognition is not supported. Upgrade your browser';
  }

  const clearHandler = () => setValue("");
  const onListen = () => {
    startListen({ lang: 'am-ET', continuous: true });
  };


  return (
    <main className='min-h-[40vh] flex items-center justify-center'>
      <div>
        <div className='flex flex-col items-center justify-center'>
          <h1>እንኳን ወደ አማርኛ ኪቦርድ በሰላም መጡ</h1>
          <div className='flex space-x-3 items-center justify-center py-7'>
            {!listening && (
              <button onClick={onListen} className='flex space-x-3'>
                <AudioLines /> <p>ጀምር / start</p>
              </button>
            )}
            {listening && (
              <div>
                <p>ድምጽዎ እየተቀዳ ነው</p>
                <button onClick={stopHandler} className='flex space-x-3'>
                  <Pause /> <p>አቁም / Stop</p>
                </button>
              </div>
            )}
          </div>
        </div>
        <div className='flex space-x-4 justify-between border border-slate-600 min-h-20 rounded h-auto py-3 px-5'>
          <p>{value}</p>
        </div>
        <div className='flex items-center  justify-center py-7 px-5 space-x-11'>
          <button onClick={clearHandler}>
            <Trash2 /> <p> አጽዳ/ clear</p>
          </button>
          <button onClick={() => window.location.reload()}><RotateCw />refresh</button>
          <button onClick={onCopyHandler} className='flex space-x-1'>
            {coping ? <><Check /> <p>copied</p></> : <><Copy /><p>copy</p></>}
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
