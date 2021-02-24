import loading from '../images/loading.svg'

function PageIsLoading(props) {
    return (
        <div className={`popup ${props.isOpen ? ' popup_opened ' : " "}`}>
            <div className="popup__img-container popup__img-container_loader">
                <img src={loading} className="popup__image" />
            </div>
        </div>
    );
}

export default PageIsLoading;