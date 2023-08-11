import { Swiper, SwiperSlide } from "swiper/react";
import { A11y,Scrollbar,  Navigation } from "swiper";
import BlogCard from "../Blog/BlogCard";
import styles from "../../styles/components/Carousels/BlogCarousel.module.scss";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/a11y";
import "swiper/css/scrollbar";
import { BLOG_CAROUSEL, AEO } from "../../utility/constant";
import VideoBlogCard from "../Blog/VideoBlogCard";
import { getThemeConfig } from "../../config/ApiConfig";

const BlogCarousel = (props) => {
  const { theme, data,sectionHeading } = props;
  const brandConfig = getThemeConfig(theme);
  console.log("componentName", props.componentName);
  const blurLastImage = true;
  const isMobile = props.isMobile;
  const { blogCarouselbreakpoints } =
    brandConfig?.page?.HomePage?.component[props.componentName || BLOG_CAROUSEL];
    const updateBlurIndex = slideData => {      
      if(isMobile){
        return
      }
      if (blurLastImage) {
        const { activeIndex, currentBreakpoint, passedParams: { breakpoints } } = slideData;
        const { slidesPerView } = breakpoints[currentBreakpoint];
        const currentSlider = slideData.wrapperEl.childNodes[parseInt(slidesPerView) + activeIndex]?.querySelector(".blurImg");
        if(currentSlider){
          currentSlider.style.display = "block"
        }
        const prevSlider = slideData.wrapperEl.childNodes[parseInt(slidesPerView) + activeIndex - 1]?.querySelector(".blurImg");
        if(prevSlider){
          prevSlider.style.display = "none"
        }
      }
      
    }

  const swiperProps = {
    slidesPerView: 3.5,
    modules: [Navigation, A11y, Scrollbar],
    className: `${styles[props.componentName]} ${styles.blogCarousel} ${styles[theme]} ${props.isMicroSite ? styles.microsite:null}`,
    navigation: true,
    scrollbar: { draggable: true },
    breakpoints: props.breakPoints || blogCarouselbreakpoints,
    ...(props.theme == AEO  ? {
      onSlideChange:updateBlurIndex,
      onAfterInit:updateBlurIndex
    } : {})
  };

  const CardComponent = props.componentName === "youtubeVideos" ? VideoBlogCard : BlogCard;

  return (
    <Swiper {...swiperProps}>
      {data &&
        data?.sort((date1, date2) => new Date(date2?.lastModifiedDate) - new Date(date1?.lastModifiedDate))?.map((blog, index) => (
          <SwiperSlide key={index}>
            {blurLastImage && props.theme ==AEO && !isMobile ? <div className={`${styles.blurImage} blurImg`}></div> : ''}
            <CardComponent {...blog} index={index} sectionHeading={sectionHeading} {...props} />
          </SwiperSlide>
        ))}
    </Swiper>
  );
};
export default BlogCarousel;
