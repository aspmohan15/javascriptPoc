import styles from "../../styles/components/Blog/BlogCard.module.scss";
import { AEM, AEO, RBK } from "../../utility/constant";
import ImageLoader from "../../utility/hooks/ImageLoader";
import { getThemeConfig } from "../../config/ApiConfig";
import { getPageName } from "../../utility/helper";
import pushAnalytics from "../../utility/analytics";
import { dateTimeStampDifference } from "../../utility/helper/dateHelpers/dateTimeStampDifference";
const classMapping = {
  curatedCollectionCard: styles.curatedCollectionCard,
};
const BlogCard = ({ image, heading, description, title, subTitle, targetLink, theme, configData, classNameKey, ctaLabel, componentName, readTime, altText = '', peBlog, index, isMobile, sectionHeading, priority, isMicroSite, lastModifiedDate }) => {
  const brandConfig = getThemeConfig(theme);
  let { imageDimensions, nextIconDimension } =  isMicroSite ?  brandConfig?.page?.MicroSite?.component?.blogcardmicrosite :
    brandConfig?.page?.HomePage?.component[componentName || "BlogCard"];

  if (theme === AEO) {
    if (isMobile) {
      imageDimensions = brandConfig?.page?.HomePage?.component[componentName]?.imgDimension?.mobile;
    } else {
      imageDimensions = brandConfig?.page?.HomePage?.component[componentName]?.imgDimension?.desktop;
    }
  }
  const handleClickBannerForAdobe = () => {
    const pageName = getPageName(isMobile);
    const _digitalData = {
      linkName: "banner click",
      channel: pageName.channel,
      linkPageName: pageName.name,
      icid: pageName.name + '-' + theme + '|' + "NA" + '|' + (title || "NA") + '|' + 'widget-click' + '|' + Number(index + 1) + '|' + sectionHeading
    }
    window.digitalData = _digitalData;
    const _dataLayer = {
      event: 'banner_click',
      channel: pageName?.channel,
      link_page_name: pageName?.name,
      brand: theme.toLowerCase(),
      icid: pageName.name + '-' + theme + '|' + "NA" + '|' + (title || "NA") + '|' + 'widget_click' + '|' + Number(index + 1) + '|' + sectionHeading
    }
    pushAnalytics(["generic-click"], configData, _dataLayer)
    window.location.href = targetLink
  }
  const handleClickCtaForAdobe = (e, ctaLabel, link) => {
    e.stopPropagation()
    if (window.digitalData) {
      const pageName = getPageName(isMobile);
      const _digitalData = {
        linkName: ctaLabel,
        channel: pageName.channel,
        linkPageName: pageName.name
      }
      window.digitalData = _digitalData;
      const _dataLayer = {
        event: 'cta_click',
        channel: pageName.channel,
        link_page_name: pageName.name,
        brand: theme.toLowerCase(),
        click_name: ctaLabel,
      }
      pushAnalytics(["generic-click"], configData, _dataLayer);
    }
  }


  return (
    <div
      className={`${styles.blogCardContainer} ${styles[componentName]} ${peBlog? styles.peBlog: ""}  ${classNameKey && classMapping[classNameKey]
        } ${isMicroSite ? styles.microsite: null} ${styles[theme]}`}
    >
      <div onClick={() => handleClickBannerForAdobe()}>
        <div className={styles.imageContainer}>
          <ImageLoader
            {...imageDimensions}
            src={image}
            className={styles.blogImage}
            alt={altText}
            title={altText}
            configData={configData} type={AEM}
            priority={priority}
            layout="responsive"
          />
          <div className={styles.borderBottom}></div>
        </div>
      </div>
      <div className={styles.blogCardInfo}>
        {readTime && <div className={styles.readTime}>{readTime}</div>}
        {theme === AEO && lastModifiedDate && <div className={styles.dateDifference}>{dateTimeStampDifference(lastModifiedDate)}</div>}
        <div className={styles.blogCardHeading}>{title}</div>
        <div className={styles.blogCardDescription}>{subTitle}</div>
        {/* <ImageLoader 
            {...nextIconDimension} 
            src={NEXT_ICON.PATH} 
            className={styles.nextIconStyle} 
            alt={NEXT_ICON.TITLE}
            TITLE={NEXT_ICON.TITLE}
            type = {CDN}
            configData = {configData}
          /> */}
        {ctaLabel && (
          <div className={styles.ctaButton}>
            <a href={targetLink} onClick={(e) => handleClickCtaForAdobe(e, ctaLabel)} target="_blank" rel="noreferrer noopener" title={ctaLabel}>{ctaLabel}</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogCard;
