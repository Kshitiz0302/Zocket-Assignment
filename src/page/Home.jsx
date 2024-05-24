import './Home.css'
import MainEditBox from '../components/EditBox/MainEditBox'
import Display from '../components/Canvas/Display'

function Home() {

    return (
        <div className='flex flex-col sm:flex-row w-screen'>

            <Display />
            <MainEditBox />

        </div>
    )
}

export default Home;