import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Missing = () => {
  const { t } = useTranslation()

  return (
    <article style={{ padding: "100px" }}>
      <h1>{t('missing.oops')}</h1>
      <p>{t('missing.pageNotFound')}</p>
      <div className="flexGrow">
        <Link to="/">{t('missing.visitHomePage')}</Link>
      </div>
    </article>
  );
};

export default Missing;
