import reg_fail from '../images/reg_fail.svg';
import reg_success from '../images/reg_success.svg';

function InfoTooltip(props) {

    return (
        <div className={`popup ${props.isOpen ? ' popup_opened ' : " "}`} >
          <div className="popup__tooltip">
            <img src={props.resAdjust === false ? reg_fail : reg_success} alt={'name'} className="popup__tooltip-image"/>
            <button className="popup__close" type="button" onClick={props.onClose}></button>
            <h3 className="popup__tooltip-heading">{props.resAdjust === false ? 'Что-то пошло не так! Попробуйте ещё раз.' : "Вы успешно зарегистрировались!"}</h3>
          </div>
        </div>
    );
}

export default InfoTooltip;