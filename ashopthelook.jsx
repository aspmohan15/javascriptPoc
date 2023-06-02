
import { Fragment } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { withTransaction } from '@elastic/apm-rum-react';
import { Navigation, Scrollbar, A11y, Pagination } from "swiper";

import { AEO } from "../../utility/constant";
import { getThemeConfig } from "../../config/ApiConfig";
import ImageLoader from "../../utility/hooks/ImageLoader";
import styles from "../../styles/components/ShopTheLookWithCarousel/ShopTheLookWithCarousel.module.scss";

const ShopTheLookWithCarouselUI = (props) => {
    const { image, title, contentText, altText, items } = props?.data;
    const brandConfig = getThemeConfig(props.theme);
    const blurLastImage = true;
    let bannerImageDimensions = brandConfig?.page?.HomePage?.component?.ShopTheLookWithCarouselUI;
    let carouselImageDimensions = brandConfig?.page?.HomePage?.component?.ShopTheLookWithCarouselUI;
    let breakPoints;

    if(props?.theme === AEO){
        breakPoints = carouselImageDimensions.thumbNailBanner?.breakPoints;
        if(props?.isMobile) {
            bannerImageDimensions = bannerImageDimensions?.mainBanner?.imgDimensions?.mobile;
            carouselImageDimensions = carouselImageDimensions?.thumbNailBanner?.imgDimensions?.mobile;
        } else {
            bannerImageDimensions = bannerImageDimensions?.mainBanner?.imgDimensions?.desktop;
            carouselImageDimensions = carouselImageDimensions?.thumbNailBanner?.imgDimensions?.desktop;
        }
    }
    const updateBlurIndex = slideData => {
        if(props?.isMobile) {
          return;
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
        if(slideData.isBeginning){
          slideData.$el[0].style.marginLeft = "-25px"
        }else{
          slideData.$el[0].style.margin = "0"
        }
    };
    const params = {
        modules: [Navigation, Pagination, Scrollbar, A11y],
        slidesPerView: '4',
        navigation: true,
        speed: 500,
        srollbar: { dragable: true },
        breakpoints: { ...breakPoints },
        watchSlidesProgress : true,
        onSlideChange:updateBlurIndex,
        onAfterInit:updateBlurIndex
    };
    return (
        <div className={`${styles.TrendsContainer}  top-bottom-spacing`}>
            <div className={`${styles.TrendsBannerImgBlock}`}>
                    <ImageLoader
                        src={image}
                        layout="responsive"
                        alt={altText}
                        {...bannerImageDimensions}
                    />
                    <div className={`${styles.TrendsBannerTextBlock}`}>
                        <h3>{title}</h3>
                        <p>{contentText}</p>
                    </div>
            </div>
            {items?.length <= 3 && !props.isMobile ? (
                 <div className={`max-container ${styles.TrendsSubtilesContainer}`}  >
                    {items?.map((item, index) => {
                        return (
                            <div key={index} className={`${styles.TrendsSubtilesBlk} ${items?.length <= 3 ? styles.itemWidth : "" }` }>
                                <div className={`${styles.TrendsBannerImgBlock}`}>
                                    <ImageLoader
                                        src={props.isMobile ? item?.mobileImage : item?.image }
                                        alt={item?.altText}
                                        {...carouselImageDimensions}
                                    />
                                    <div className={`${styles.TrendsSubtilesTextBlk}`}>
                                        <p>{item?.title}</p>
                                    </div>
                                </div>
                                <p className={`${styles.TrendsSubtilesTitleBlk}`}>{item?.contentText}</p>
                            </div>
                        )
                    })}
             </div>
            ) : (
                <div className={`${styles.sliderTrendsSubtilesContainer} ${styles.TrendsSubtilesContainer}  ${items?.length > 3 ? styles.thumNailcarouselConatiner : "" }`} >
                    <Swiper {...params} className={`${styles.TrendsSwiperSlider} trendSlider`}>
                        {items?.map((item, index) => {
                            return (
                                <Fragment key={index}>
                                        <SwiperSlide>
                                            <div className={`${styles.TrendsSubtilesBlk}`}>
                                                <div className={`${styles.TrendsBannerImgBlock}`}>
                                                    {blurLastImage && <div className={`${styles.blurImage} blurImg`}></div>}
                                                    <ImageLoader  
                                                        src={props.isMobile ? item?.mobileImage : item?.image }
                                                        alt={item?.altText}
                                                        {...carouselImageDimensions}
                                                    />
                                                    <div className={`${styles.TrendsSubtilesTextBlk}`}>
                                                        <p>{item?.title}</p>
                                                    </div>
                                                </div>
                                                <p className={`${styles.TrendsSubtilesTitleBlk}`}>{item?.contentText}</p>
                                            </div>
                                        </SwiperSlide>
                                </Fragment>
                        )})} 
                    </Swiper>
               </div>
            )}
        </div>
    )
}
export default withTransaction('Trends', 'component')(ShopTheLookWithCarouselUI);