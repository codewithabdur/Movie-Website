import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Profile, Register, Login } from "./Components";
import { HomePage, LandingPage, Footer,Contact } from './Containers'
import { HollywoodPage, Hollywood2010, Hollywood, H2010, TopRated } from './Pages'
import Error from './Containers/Error/Error'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/profile/:username" element={<Profile />}></Route>
        <Route path="/landingpage" element={<LandingPage />}></Route>
        <Route path="/Footer" element={<Footer />}></Route>
        <Route path="/toprated" element={<TopRated />}></Route>
        <Route path="/hollywood2010" element={<Hollywood2010 />}></Route>
        <Route path="/hollywoodpage" element={<HollywoodPage />}></Route>
        <Route path="/h2010/:id" element={<H2010 />}></Route>
        <Route path="/hollywood/:id" element={<Hollywood />}></Route>
      <Route path="*" element={<Error />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
