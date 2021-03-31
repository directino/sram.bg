import { db } from '../../firebase';
import { useRef, useState } from "react"
import { useHistory } from "react-router-dom"
import { useAuth } from "../../services/authService"
import ReCAPTCHA from "react-google-recaptcha";

export default function Contact() {
    const phoneRef = useRef();
    const emailRef = useRef();
    const messageRef = useRef();
    const nameRef = useRef();
    const [value, setValue] = useState('')
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

        if (value === '') {
            return setError('Моля отбележете отметката "Не съм робот"!')
        }

        if (emailRef.current.value === '' || messageRef.current.value === '' || nameRef.current.value === '') {
            return setError('Моля попълнете полетата за име, имейл и съобщение!')
        }

        db.ref("messages")
            .push({
                phone: phoneRef.current.value,
                email: emailRef.current.value,
                message: messageRef.current.value,
                name: nameRef.current.value,
            })
            .then(() => {
                setError("Успешно изпратихте съобщение!")
                phoneRef.current.value = '';
                emailRef.current.value = formEmail;
                nameRef.current.value = '';
                messageRef.current.value = '';
                history.push('/contact');
            })
            .catch(() => {
                setError("Неуспешна операция!")
            })
    }

    function onChange(value) {
        setValue({value})
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
                        <iframe title="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d183.4497740633356!2d23.369775611552516!3d42.63599649044521!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa85cb55668ae1%3A0x447f9dd693e57def!2sSoftUni!5e0!3m2!1sbg!2sbg!4v1617190526318!5m2!1sbg!2sbg" style={{
                            border: '0',
                            width: '100%',
                            height: '420px',
                            frameborder: '0'
                        }} allowFullScreen loading="lazy"></iframe>
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
                            <ReCAPTCHA className="mt-2"
                                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                                onChange={onChange}
                            />
                            <button onClick={handleSubmit} className="btn btn-outline-primary text-uppercase mt-2">
                                    Изпрати
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}