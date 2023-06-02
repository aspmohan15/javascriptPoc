import { getThemeConfig } from "../../config/ApiConfig";
import { withTransaction } from "@elastic/apm-rum-react";
import ImageLoader from "../../utility/hooks/ImageLoader";
import styles from "../../styles/components/ShopTheLookWithCarousel/ShopTheLookWithCarousel.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { A11y, Navigation, Scrollbar } from "swiper";

const ShopTheLookWithCarouselUI = (props) => {
    let data = props?.data;
    const brandConfig = getThemeConfig(props.theme);
    const [blurIndex, setBlurIndex] = useState("");
    const blurLastImage = true;
    const isMobile = false;
    let imagePath = data.image;

    const images = [
        {
            url: "https://imagescdn.aeo.in/img/app/brands/ae/ae-trends/subtile1.png?auto=format",
        },
        {
            url: "https://imagescdn.aeo.in/img/app/brands/ae/ae-trends/subtile1.png?auto=format",
        },
        {
            url: "https://imagescdn.aeo.in/img/app/brands/ae/ae-trends/subtile1.png?auto=format",
        },
        {
            url: "https://imagescdn.aeo.in/img/app/brands/ae/ae-trends/subtile1.png?auto=format",
        },
        {
            url: "https://imagescdn.aeo.in/img/app/brands/ae/ae-trends/subtile1.png?auto=format",
        },
        {
            url: "https://imagescdn.aeo.in/img/app/brands/ae/ae-trends/subtile1.png?auto=format",
        },
        {
            url: "https://imagescdn.aeo.in/img/app/brands/ae/ae-trends/subtile1.png?auto=format",
        },
        {
            url: "https://imagescdn.aeo.in/img/app/brands/ae/ae-trends/subtile1.png?auto=format",
        },
        {
            url: "https://imagescdn.aeo.in/img/app/brands/ae/ae-trends/subtile1.png?auto=format",
        },
        {
            url: "https://imagescdn.aeo.in/img/app/brands/ae/ae-trends/subtile1.png?auto=format",
        },
    ];
    const swiperRef = useRef(null);
    const updateBlurIndex = (slideData) => {
        return;
        console.log(slideData, "slideDataslideData");
        // if(props.blurLastImage && !props.isMobile){
        if (blurLastImage && !isMobile) {
            const {
                activeIndex,
                currentBreakpoint,
                passedParams: { breakpoints },
            } = slideData;
            if (breakpoints[currentBreakpoint]) {
                const { slidesPerView } = breakpoints[currentBreakpoint];
                setBlurIndex(1);
            }
        }
    };
    const blurlastVisibleSlide = () => {
        console.log("blurlastVisibleSlide");
        var eleList = document.querySelectorAll(
            ".trendSlider .swiper-slide-visible"
        );
        eleList.forEach(function (ele, index) {
            ele.classList.remove("active");
            if (index == 3) {
                ele.classList.add("active");
            }
        });
    };
    const params = {
        modules: [Navigation, Scrollbar, A11y],
        slidesPerView: "4",
        spaceBetween: 10,
        navigation: true,
        // scrollbar: { draggable: true},
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
        onSlideChangeTransitionEnd: blurlastVisibleSlide,
    };

    return (
        <div className={`${styles.TrendsContainer}`}>
            <div className={`${styles.TrendsBannerImgBlock}`}>
                <ImageLoader
                    // src="https://imagescdn.aeo.in/img/app/brands/ae/ae-trends/TrendIn1.png?auto=format"
                    src={imagePath}
                    layout="responsive"
                    alt="Banner"
                    width="1600"
                    height="800"
                />
                <div className={`${styles.TrendsBannerTextBlock}`}>
                    <h3>{data?.title}</h3>
                    <p>{data?.contentText}</p>
                </div>
            </div>
            <div
                className={`max-container ${styles.TrendsSubtilesContainer}`}
                style={{ display: "none" }}
            >
                <div className={`${styles.TrendsSubtilesBlk}`}>
                    <div className={`${styles.TrendsBannerImgBlock}`}>
                        <ImageLoader
                            src="https://imagescdn.aeo.in/img/app/brands/ae/ae-trends/subtile1.png?auto=format"
                            layout="responsive"
                            alt="Banner"
                            width="420"
                            height="240"
                        />
                        <div className={`${styles.TrendsSubtilesTextBlk}`}>
                            <p>Artist Flare Jean</p>
                        </div>
                    </div>
                    <p className={`${styles.TrendsSubtilesTitleBlk}`}>
                        Serves a unique kind of fashion style.
                    </p>
                </div>
                <div className={`${styles.TrendsSubtilesBlk}`}>
                    <div className={`${styles.TrendsBannerImgBlock}`}>
                        <ImageLoader
                            src="https://imagescdn.aeo.in/img/app/brands/ae/ae-trends/subtile2.png?auto=format"
                            layout="responsive"
                            alt="Banner"
                            width="420"
                            height="240"
                        />
                        <div className={`${styles.TrendsSubtilesTextBlk}`}>
                            <p>Bootcut Jeans</p>
                        </div>
                    </div>
                    <p className={`${styles.TrendsSubtilesTitleBlk}`}>
                        The evergreen trend.
                    </p>
                </div>
                <div className={`${styles.TrendsSubtilesBlk}`}>
                    <div className={`${styles.TrendsBannerImgBlock}`}>
                        <ImageLoader
                            src="https://imagescdn.aeo.in/img/app/brands/ae/ae-trends/subtile1.png?auto=format"
                            layout="responsive"
                            alt="Banner"
                            width="420"
                            height="240"
                        />
                        <div className={`${styles.TrendsSubtilesTextBlk}`}>
                            <p>Curvy Jeans</p>
                        </div>
                    </div>
                    <p className={`${styles.TrendsSubtilesTitleBlk}`}>
                        Made for the body that deserves to be flaunted.
                    </p>
                </div>
            </div>

            <div
                className={`${styles.sliderTrendsSubtilesContainer} ${styles.TrendsSubtilesContainer}`}
            >
                <Swiper
                    {...params}
                    ref={swiperRef}
                    className={`${styles.TrendsSwiperSlider} trendSlider`}
                >
                    {images.map((image, index) => {
                        return (
                            <Fragment key={index}>
                                <SwiperSlide
                                    className={index == 3 ? `${"active"}` : ""}
                                >
                                    {/* <div className={`${styles.TrendsSubtilesBlk} ${blurIndex === index && blurLastImage && styles.blurSlideContainer} `}> */}
                                    <div
                                        className={`${styles.TrendsSubtilesBlk}`}
                                    >
                                        <div
                                            className={`${styles.TrendsBannerImgBlock}`}
                                        >
                                            <ImageLoader
                                                // src="https://imagescdn.aeo.in/img/app/brands/ae/ae-trends/subtile1.png?auto=format"
                                                src={image.url}
                                                layout="responsive"
                                                alt="Banner"
                                                width="420"
                                                height="240"
                                            />
                                            <div
                                                className={`${styles.TrendsSubtilesTextBlk}`}
                                            >
                                                <p>Curvy Jeans</p>
                                            </div>
                                        </div>
                                        <p
                                            className={`${styles.TrendsSubtilesTitleBlk}`}
                                        >
                                            Made for the body that deserves to
                                            be flaunted.
                                        </p>
                                    </div>
                                </SwiperSlide>
                            </Fragment>
                        );
                    })}
                </Swiper>
            </div>
        </div>
    );
};

export default withTransaction(
    "Trends",
    "component"
)(ShopTheLookWithCarouselUI);
