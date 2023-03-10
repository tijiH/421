import { Inter } from '@next/font/google'
import Router from 'next/router'
import { Dialog } from 'primereact/dialog';
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [visible, setVisible] = useState(false);

  const handleClick = (e) => {
    e.preventDefault()
    // setVisible(true);
    Router.push("/partie/enterPlayersName")
  }

  return (
    <>
      <div className="flex flex-column align-items-center gap-2">
        <div className='p-card w-5 mt-8 text-center select-none cursor-pointer' onClick={handleClick}>
          <h2>Sans des</h2>
        </div>
        <div className='p-card w-5 mt-8 text-center select-none cursor-pointer' style={{ filter: 'blur(4px)'}}>
          <h2>Avec des</h2>
        </div>
        <Dialog
          header={
            <p className='text-center text-color-black text-sm'>Mettre de l argent en jeu ?</p>
          }
          visible={visible}
          onHide={() => setVisible(false)}
          footer={
            <div className="flex justify-content-center align-items-center">
              <button
                className="p-button p-button-success text-center"
                onClick={() => Router.push('/partie/enterPlayersName')}
              >
                Oui
              </button>
              <button
                className="p-button p-button-danger"
                onClick={() => setVisible(false)}
              >
                Non
              </button>
            </div>
          }
        >
        </Dialog>
      </div>
    </>
  )
}
