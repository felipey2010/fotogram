import logo from "../images/logo.png";

export default function Title() {
  return (
    <div className="title">
      <div className="title-logo">
        <img src={logo} alt="logo" />
        <h1>FotoGram</h1>
      </div>
      <h2>Your Photo Lab</h2>
      <p>You register that moment...We show it</p>
    </div>
  );
}
