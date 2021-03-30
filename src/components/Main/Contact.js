import db from '../../firebase';
import { useRef, useState } from "react"
import { useHistory } from "react-router-dom"
import { useAuth } from "../../services/authService"

export default function Contact() {
    const phoneRef = useRef();
    const emailRef = useRef();
    const messageRef = useRef();
    const nameRef = useRef();
    const [error, setError] = useState('')
    const { currentUser } = useAuth();
    const history = useHistory();
    let formEmail = '';
    if (currentUser) {
        formEmail = currentUser.email
    }

    function handleSubmit(e) {
        e.preventDefault()

        setError("")
        db.ref("messages")
            .push({
                phone: phoneRef.current.value,
                email: emailRef.current.value,
                message: messageRef.current.value,
                name: nameRef.current.value,
            })
            .then(() => {
                setError("Успешно изпратихте съобщение!")
                history.push('/contact');
            })
            .catch(() => {
                setError("Неуспешна операция!")
            })
    }

    document.title = "Sram.bg - връзка с нас";
    return (
        <section className="my-5 py-5">
            <div className="container">
                <div className="well well-sm">
                    <h3><strong>Връзка с нас</strong></h3>
                </div>
                <div className="row">
                    <div className="col-md-7">
                        <iframe title="map" src="https://www.google.bg/maps/d/u/0/embed?mid=15msk4RzNDcCUU14nYwRdqILYyNDfpRh3" style={{
                            border: '0',
                            width: '100%',
                            height: '315px',
                            frameborder: '0'
                        }} allowFullScreen></iframe>
                    </div>
                    <div className="col-md-5">
                        <h4><strong>Остави съобщение</strong></h4>
                        {error && <div className="alert">
                            {error}
                            </div>}
                        <form>
                            <div className="form-group">
                                <input type="text" className="form-control" ref={nameRef} placeholder="Име" />
                            </div>
                            <div className="form-group">
                                <input type="email" className="form-control" ref={emailRef} defaultValue={formEmail} placeholder="Имейл" />
                            </div>
                            <div className="form-group">
                                <input type="tel" className="form-control" ref={phoneRef} placeholder="Телефон" />
                            </div>
                            <textarea className="form-control" cols="30" rows="3" ref={messageRef} placeholder="Съобщение"></textarea>
                            <button onClick={handleSubmit} className="btn btn-outline-primary text-uppercase mt-2">
                                <i className="fa fa-paper-plane-o" aria-hidden="true" />
                                <i className="fab fa-telegram-plane" />
                                    &nbsp;Изпрати
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}