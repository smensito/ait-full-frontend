import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Unauthorized = () => {
  const { t } = useTranslation()
  const navigate = useNavigate();


  const goBack = () => navigate(-1);

  return (
    <section>
      <h1>{t('common.unauthorized.unauthorized')}</h1>
      <br />
      <p>{t('common.unauthorized.noAccess')}</p>
      <div className="flexGrow">
        <button onClick={goBack}>{t('common.goBack')}</button>
      </div>
    </section>
  );
};

export default Unauthorized;
