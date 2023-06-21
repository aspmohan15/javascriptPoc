<div className={`${styles.categoryCollectionContainer}  top-bottom-spacing ${isCarouselTypeThumbnail ? styles.categoryCollectionThumbnail : ''}`}>
    <div className={styles.categoryCollectionsHeader}>
        <Typography variant="h4" className={styles.headerText}>{title}</Typography>
        <Typography variant="p" className={styles.headerDesc}>{contentText}</Typography>
    </div>
    <div className={styles.categoryCollectionContentBlk}>
        {isCarouselTypeThumbnail ? <div className={styles.collectionThumbnailBlk}>
            <a href="">
                <ImageLoader
                    src={props.isMobile ? mobileLImage : desktopLImage}
                    layout="responsive"
                    {...thumbnailImgDimension}
                    alt={altLText}
                    title={altLText}
                />
                <div className={styles.thumbnailTitleBlock}>
                    <Typography variant="p" className={styles.thumbnailTitle}>{titleThumbnail}</Typography>
                    <Button variant="filled" className={styles.ctaBTNthmbnail} >{ctaLabelThum}</Button>
                </div>
            </a>
        </div>
            : ''
        }
        <div className={`${styles.categoryCollectionsSliderBlk}`}>
            <Swiper {...swiperProps} className={`exploreCollectionSlide`}>
                {items.map((itemsData, index) => {
                    return (
                        <>
                            <SwiperSlide>
                                {blurLastImage && <div className={`${styles.blurImage} blurImg`}></div>}
                                <a href={itemsData.targetLink} title={itemsData.altLText}>
                                    <div className={`${styles.card_container}`}>
                                        <ImageLoader
                                            src={props.isMobile ? itemsData.mobileImage : itemsData.desktopImage}
                                            layout="responsive"
                                            {...ImageDimensions}
                                            alt={itemsData.altLText}
                                            title={itemsData.altLText}
                                        />
                                        {console.log(ImageDimensions, 'ImageDimensions')}
                                        <div className={styles.card_TextBlk}>
                                            <Typography className={styles.card_categoryName}>
                                                {itemsData.title}
                                            </Typography>
                                            <Typography className={styles.card_categoryDesc}>
                                                {itemsData.contentText}
                                            </Typography>
                                        </div>
                                    </div>
                                </a>
                            </SwiperSlide>
                        </>
                    )
                }
                )}
            </Swiper>

        </div>
    </div>
    {!isCarouselTypeThumbnail ? <a href={targetLink}> <Button color={PRIMARY_BLACK} variant="contained" className={styles.shopALLLink}>{ctaLabel}</Button></a> : ""}
</div>