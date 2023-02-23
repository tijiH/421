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
      <main className="">
        <div className='p-card p-2 m-8 text-center select-none' onClick={handleClick}>
          <h2>Sans des</h2>
        </div>
        <div className='p-card p-2 m-8 text-center select-none'>
          <h2>Avec des</h2>
        </div>
        <Dialog
          header={
            <p className='text-center text-color-black text-sm'>Mettre de l'argent en jeu ?</p>
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
      </main>
    </>
  )
}
