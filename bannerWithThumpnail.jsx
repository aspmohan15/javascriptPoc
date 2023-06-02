import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper";
import ImageLoader from "../../utility/hooks/ImageLoader";
import { getThemeConfig } from "../../config/ApiConfig";
import { withTransaction } from '@elastic/apm-rum-react';
import styles from "../../styles/components/BannerwithThumbnail/BannerwithThumbnail.module.scss";
import { Button } from "@mui/material";

const BannerwithThumbnailUI = (props) => {
    const brandConfig = getThemeConfig(props.theme);
   
    const onSliderCustomChange = () =>{
        var sliderIndexval = document.querySelector('.InspirationSlide.swiper-slide-active').getAttribute('data-swiper-eleindex');
        document.querySelectorAll('.lookBookSlide').forEach(function(ele, index){
            ele.style.display = 'none';
            var eleIndexVal = ele.getAttribute('data-Inspiredswiper-matchedBlk');
            if(eleIndexVal == sliderIndexval){
                ele.style.display = 'block'; 
            }
            console.log(eleIndexVal,'eleIndexVal');
            console.log(sliderIndexval,'sliderIndexval');
        });        
    }

    return (
        <div className={`${styles.IdeasInspirationContainer} max-container`}>
                <h3 className={`${styles.inspirationHeader}`}>Ideas and Inspiration</h3>
                <div className={`${styles.inspirationSliderLookBookContainer}`}>
                    <div className={`${styles.inspirationSliderBlk}`}>
                        <Swiper
                            pagination={{
                                clickable: true,
                            }}
                            speed= {2000}
                            navigation={true}
                            loop={true}
                            modules={[Autoplay, Pagination, Navigation]}
                            className={`${styles.bannerWrapper} inspirationSlider ${styles.inspirationBannerWrapper}`}
                            autoplay={false}
                            a11y={false}
                            onSlideChangeTransitionEnd = {onSliderCustomChange}
                        >
                                <SwiperSlide className={`InspirationSlide`} data-swiper-eleindex="0">
                                    <div className={`${styles.inspirationSlider}`}>
                                        <ImageLoader
                                            src="https://imagescdn.aeo.in/img/app/brands/ae/ae-trends/ae-slide-inspiration.png?auto=format"
                                            layout="responsive"
                                            alt="Banner"
                                            width="420"
                                            height="686"
                                        />
                                        <p className={`${styles.inspirationSliderTitle}`}>
                                             Need jeans for long days?
                                        </p>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide className={`InspirationSlide`} data-swiper-eleindex="1">
                                    <div className={`${styles.inspirationSlider}`}>
                                        <ImageLoader
                                            src="https://imagescdn.aeo.in/img/app/brands/ae/ae-trends/ae-slide-inspiration.png?auto=format"
                                            layout="responsive"
                                            alt="Banner"
                                            width="420"
                                            height="686"
                                        />
                                        <p className={`${styles.inspirationSliderTitle}`}>
                                             Need jeans for long days?
                                        </p>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide className={`InspirationSlide`} data-swiper-eleindex="2">
                                    <div className={`${styles.inspirationSlider}`}>
                                        <ImageLoader
                                            src="https://imagescdn.aeo.in/img/app/brands/ae/ae-trends/ae-slide-inspiration.png?auto=format"
                                            layout="responsive"
                                            alt="Banner"
                                            width="420"
                                            height="686"
                                        />
                                        <p className={`${styles.inspirationSliderTitle}`}>
                                             Need jeans for long days?
                                        </p>
                                    </div>
                                </SwiperSlide>
                        </Swiper>
                    </div>
                    <div className={`${styles.lookBookSlideContainer}`}>
                       <div className={`${styles.lookBookContainer} lookBookSlide`} data-Inspiredswiper-matchedBlk="0">
                                <div className={`${styles.lookBookImgContainer}`}>
                                    <div className={`${styles.lookBookImgBlk}`}>
                                        <ImageLoader
                                            src="https://imagescdn.aeo.in/img/app/brands/ae/ae-trends/lookbookModel-v1.jpg?auto=format"
                                            layout="responsive"
                                            alt="Banner"
                                            width="287"
                                            height="526"
                                        />
                                    </div>
                                    <div className={`${styles.lookBookImgOverlayBlk}`}>
                                        <Button  size="medium" variant="outlined" className={`${styles.lookBookImgOverlayBtn}`}>
                                            SHOP THE LOOK 1
                                        </Button>
                                    </div>
                                    <div className={`${styles.lookBookImgOverlayCartIcon}`}>
                                        <ImageLoader
                                            src="https://imagescdn.aeo.in/img/app/brands/ae/ae-trends/ae-widget-cart.png?auto=format"
                                            layout="responsive"
                                            alt="Banner"
                                            width="45"
                                            height="46"
                                        />
                                    </div>
                                </div>
                                <div className={`${styles.lookBookImgContainer}`}>
                                    <div className={`${styles.lookBookImgBlk}`}>
                                        <ImageLoader
                                            src="https://imagescdn.aeo.in/img/app/brands/ae/ae-trends/lookbookModel-v1.jpg?auto=format"
                                            layout="responsive"
                                            alt="Banner"
                                            width="287"
                                            height="526"
                                        />
                                    </div>
                                    <div className={`${styles.lookBookImgOverlayBlk}`}>
                                        <Button  size="medium" variant="outlined" className={`${styles.lookBookImgOverlayBtn}`}>
                                            SHOP THE LOOK
                                        </Button>
                                    </div>
                                    <div className={`${styles.lookBookImgOverlayCartIcon}`}>
                                        <ImageLoader
                                            src="https://imagescdn.aeo.in/img/app/brands/ae/ae-trends/ae-widget-cart.png?auto=format"
                                            layout="responsive"
                                            alt="Banner"
                                            width="45"
                                            height="46"
                                        />
                                    </div>
                                </div>
                                <div className={`${styles.lookBookImgContainer}`}>
                                    <div className={`${styles.lookBookImgBlk}`}>
                                        <ImageLoader
                                            src="https://imagescdn.aeo.in/img/app/brands/ae/ae-trends/lookbookModel-v1.jpg?auto=format"
                                            layout="responsive"
                                            alt="Banner"
                                            width="287"
                                            height="526"
                                        />
                                    </div>
                                    <div className={`${styles.lookBookImgOverlayBlk}`}>
                                        <Button  size="medium" variant="outlined" className={`${styles.lookBookImgOverlayBtn}`}>
                                            SHOP THE LOOK
                                        </Button>
                                    </div>
                                    <div className={`${styles.lookBookImgOverlayCartIcon}`}>
                                        <ImageLoader
                                            src="https://imagescdn.aeo.in/img/app/brands/ae/ae-trends/ae-widget-cart.png?auto=format"
                                            layout="responsive"
                                            alt="Banner"
                                            width="45"
                                            height="46"
                                        />
                                    </div>
                                </div>
                        </div>

                        <div className={`${styles.lookBookContainer} lookBookSlide`} data-Inspiredswiper-matchedBlk="1" style={{display: "none"}}>
                                <div className={`${styles.lookBookImgContainer}`}>
                                    <div className={`${styles.lookBookImgBlk}`}>
                                        <ImageLoader
                                            src="https://imagescdn.aeo.in/img/app/brands/ae/ae-trends/lookbookModel-v1.jpg?auto=format"
                                            layout="responsive"
                                            alt="Banner"
                                            width="287"
                                            height="526"
                                        />
                                    </div>
                                    <div className={`${styles.lookBookImgOverlayBlk}`}>
                                        <Button  size="medium" variant="outlined" className={`${styles.lookBookImgOverlayBtn}`}>
                                            SHOP THE LOOK 2
                                        </Button>
                                    </div>
                                    <div className={`${styles.lookBookImgOverlayCartIcon}`}>
                                        <ImageLoader
                                            src="https://imagescdn.aeo.in/img/app/brands/ae/ae-trends/ae-widget-cart.png?auto=format"
                                            layout="responsive"
                                            alt="Banner"
                                            width="45"
                                            height="46"
                                        />
                                    </div>
                                </div>
                                <div className={`${styles.lookBookImgContainer}`}>
                                    <div className={`${styles.lookBookImgBlk}`}>
                                        <ImageLoader
                                            src="https://imagescdn.aeo.in/img/app/brands/ae/ae-trends/lookbookModel-v1.jpg?auto=format"
                                            layout="responsive"
                                            alt="Banner"
                                            width="287"
                                            height="526"
                                        />
                                    </div>
                                    <div className={`${styles.lookBookImgOverlayBlk}`}>
                                        <Button  size="medium" variant="outlined" className={`${styles.lookBookImgOverlayBtn}`}>
                                            SHOP THE LOOK
                                        </Button>
                                    </div>
                                    <div className={`${styles.lookBookImgOverlayCartIcon}`}>
                                        <ImageLoader
                                            src="https://imagescdn.aeo.in/img/app/brands/ae/ae-trends/ae-widget-cart.png?auto=format"
                                            layout="responsive"
                                            alt="Banner"
                                            width="45"
                                            height="46"
                                        />
                                    </div>
                                </div>
                                <div className={`${styles.lookBookImgContainer}`}>
                                    <div className={`${styles.lookBookImgBlk}`}>
                                        <ImageLoader
                                            src="https://imagescdn.aeo.in/img/app/brands/ae/ae-trends/lookbookModel-v1.jpg?auto=format"
                                            layout="responsive"
                                            alt="Banner"
                                            width="287"
                                            height="526"
                                        />
                                    </div>
                                    <div className={`${styles.lookBookImgOverlayBlk}`}>
                                        <Button  size="medium" variant="outlined" className={`${styles.lookBookImgOverlayBtn}`}>
                                            SHOP THE LOOK
                                        </Button>
                                    </div>
                                    <div className={`${styles.lookBookImgOverlayCartIcon}`}>
                                        <ImageLoader
                                            src="https://imagescdn.aeo.in/img/app/brands/ae/ae-trends/ae-widget-cart.png?auto=format"
                                            layout="responsive"
                                            alt="Banner"
                                            width="45"
                                            height="46"
                                        />
                                    </div>
                                </div>
                        </div>

                        <div className={`${styles.lookBookContainer} lookBookSlide`} data-Inspiredswiper-matchedBlk="2" style={{display: "none"}}>
                                <div className={`${styles.lookBookImgContainer}`}>
                                    <div className={`${styles.lookBookImgBlk}`}>
                                        <ImageLoader
                                            src="https://imagescdn.aeo.in/img/app/brands/ae/ae-trends/lookbookModel-v1.jpg?auto=format"
                                            layout="responsive"
                                            alt="Banner"
                                            width="287"
                                            height="526"
                                        />
                                    </div>
                                    <div className={`${styles.lookBookImgOverlayBlk}`}>
                                        <Button  size="medium" variant="outlined" className={`${styles.lookBookImgOverlayBtn}`}>
                                            SHOP THE LOOK 3
                                        </Button>
                                    </div>
                                    <div className={`${styles.lookBookImgOverlayCartIcon}`}>
                                        <ImageLoader
                                            src="https://imagescdn.aeo.in/img/app/brands/ae/ae-trends/ae-widget-cart.png?auto=format"
                                            layout="responsive"
                                            alt="Banner"
                                            width="45"
                                            height="46"
                                        />
                                    </div>
                                </div>
                                <div className={`${styles.lookBookImgContainer}`}>
                                    <div className={`${styles.lookBookImgBlk}`}>
                                        <ImageLoader
                                            src="https://imagescdn.aeo.in/img/app/brands/ae/ae-trends/lookbookModel-v1.jpg?auto=format"
                                            layout="responsive"
                                            alt="Banner"
                                            width="287"
                                            height="526"
                                        />
                                    </div>
                                    <div className={`${styles.lookBookImgOverlayBlk}`}>
                                        <Button  size="medium" variant="outlined" className={`${styles.lookBookImgOverlayBtn}`}>
                                            SHOP THE LOOK
                                        </Button>
                                    </div>
                                    <div className={`${styles.lookBookImgOverlayCartIcon}`}>
                                        <ImageLoader
                                            src="https://imagescdn.aeo.in/img/app/brands/ae/ae-trends/ae-widget-cart.png?auto=format"
                                            layout="responsive"
                                            alt="Banner"
                                            width="45"
                                            height="46"
                                        />
                                    </div>
                                </div>
                                <div className={`${styles.lookBookImgContainer}`}>
                                    <div className={`${styles.lookBookImgBlk}`}>
                                        <ImageLoader
                                            src="https://imagescdn.aeo.in/img/app/brands/ae/ae-trends/lookbookModel-v1.jpg?auto=format"
                                            layout="responsive"
                                            alt="Banner"
                                            width="287"
                                            height="526"
                                        />
                                    </div>
                                    <div className={`${styles.lookBookImgOverlayBlk}`}>
                                        <Button  size="medium" variant="outlined" className={`${styles.lookBookImgOverlayBtn}`}>
                                            SHOP THE LOOK
                                        </Button>
                                    </div>
                                    <div className={`${styles.lookBookImgOverlayCartIcon}`}>
                                        <ImageLoader
                                            src="https://imagescdn.aeo.in/img/app/brands/ae/ae-trends/ae-widget-cart.png?auto=format"
                                            layout="responsive"
                                            alt="Banner"
                                            width="45"
                                            height="46"
                                        />
                                    </div>
                                </div>
                        </div>
                  </div>
                </div>
        </div>  
    )
}

export default withTransaction('BannerwithThumbnail', 'component')(BannerwithThumbnailUI);