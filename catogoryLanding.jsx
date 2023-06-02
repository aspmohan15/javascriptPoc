import dynamic from "next/dynamic";
import { Fragment } from "react";
import { getPlacementName } from "../helper";
import { LP, PE, AS, VH, TOP, AEO } from "../constant";
import {AEM_LEFT_RIGHT_IMAGE, AEM_RECOMMENDATION, AEM_SHOP_BY_CATEGORY, AEM_SHOP_THE_LOOK, AEM_STYLE_UP, AEM_HERO_BANNER, AEM_FLASHDEAL_BANNER, AEM_PROMO_BANNER, AEM_TITLE_TEXT,AEM_CHILD_CONTAINER,AEM_IMAGE_BANNERS, AEM_SIGNUP_BANNER, AEM_SHOP_BY_OCASSION, AEM_SHOPBY_LABELS, AEM_GENERIC_CONTAINER, AEM_TOP_BOTTOM_IMAGE, AEM_COLLECTION_BANNER,AEM_DESIGNER_PICKS, AEM_DISCOVER_NEW, AEM_SHOP_LOOK, AEM_OCCASSION_CAROUSEL, AEM_COLUMN_CONTROLLER, AEM_LP_BLOG} from "../aemMappingConstants";

const BrandStory = dynamic(() => import("../../components/BrandStory/BrandStory"));
const CategoryThumbnail = dynamic(() => import("../../components/CategoryThumbnail/CategoryThumbnail"));
const TextBanner = dynamic(() => import('../../components/TextBanner/TextBanner'));
const ShopByLables = dynamic(() => import('../../components/ShopByLabels/ShopByLabels'));
const SubCategory = dynamic(() => import('../../components/SubCategory/SubCategory'));
const OneSuitAllOccasion = dynamic(() => import("../../components/OneSuitAllOccasion_BLP/OneSuitAllOccasion_BLP"));
const BottomText = dynamic(() => import("../../components/BottomText/BottomText"));
const ShopByCategory = dynamic(() => import("../../components/ShopByCategory/ShopByCategory"));
const ProductWithBanner = dynamic(() => import("../../components/ProductWithBanner/ProductWithBanner"));
const BrandVideo = dynamic(() => import("../../components/BrandVideo_BLP/BrandVideo_BLP"));

const MediaAndDescription = dynamic(() => import("../../components/MediaAndDescription/MediaAndDescription"));
const ShopByOccassion = dynamic(() => import("../../components/ShopByOccasion/ShopByOccasion"));
const FullMediaText = dynamic(() => import("../../components/FullWidthMediaText/FullWidthMedia"));
const RecommendedProducts = dynamic(() => import("../../components/RecommendedProducts/RecommendedProducts"));
const CircleImageCarousel = dynamic(() => import("../../components/CircleImageCarousel/CircleImageCarousel"));
const DesignersPicksAS = dynamic(() => import("../../components/DesignersPicks_AS/DesignersPicks_AS"));
const DiscoverNewCollection = dynamic(() => import("../../components/DiscoverNewCollection/DiscoverNewCollection"));
const DealsDayASCLP = dynamic(() => import("../../components/DealsDay_AS/DealsDayCLP_AS"));
const ShopForOthers = dynamic(() => import("../../components/ShopForOthers_AS/ShopForOthers"));
const SubBannerCLP = dynamic(() => import("../../components/SubBannerBLP/SubBannerBLP"));
const FromPeople = dynamic(() => import("../../components/FromPeopleAS/FromPeople"));
const StyleUp = dynamic(() => import('../../components/StyleUp/StyleUp'));
const TrendingStylesAS = dynamic(() => import("../../components/TrendingStyles_AS/TrendingStyles_AS"));
const ShopTheLook = dynamic(() => import("../../components/ShopLook/ShopLook"));
const ShopByOccasionAS = dynamic(() => import("../../components/ShopByOccasionAs/ShopByOccasionAS"));
const ShopEssentials = dynamic(() => import("../../components/ShopEssentials/ShopEsseentials"));
const LocateStore = dynamic(() => import("../../components/LocateStore/LocateStore"));
const ShopBySubBrand = dynamic(() => import("../../components/ShopBySubBrand/ShopBySubBrand"));
const CircularCardList = dynamic(() => import("../../components/CircuralCardList/CircularCardList"));
const Blog = dynamic(() => import('../../components/Blog/Blog'));


export default function CategoryLanding({ key, componentData, props, engageData, recomProducts }) {
    console.log(componentData,"CategoryLandingCategoryLanding");

    if (componentData && componentData[":type"] === AEM_TITLE_TEXT) {
        const topBottomSpacing = componentData.logo ? true : false;
        return <Fragment key={key}>
            <BottomText  {...props} data={componentData} topBottomSpacing={topBottomSpacing} isCLP={true} divider={props.theme == AS ? true : false} />
        </Fragment>
    }

    if (componentData && componentData[":type"] === AEM_CHILD_CONTAINER) {
        return <Fragment key={key}>
            {
                props.theme === PE ? <ShopBySubBrand {...props} data={componentData} /> :
                    <CategoryThumbnail data={componentData} {...props} isASCLP={props.theme === AS} customClassName='ClpMenCategoryThumbnail' />
            }
        </Fragment>
    }

    if (componentData && componentData[":type"] === AEM_PROMO_BANNER) {
        return <Fragment key={key}>
            <TextBanner data={componentData} {...props} />
        </Fragment>
    }

    if (componentData && componentData[":type"] === AEM_LEFT_RIGHT_IMAGE) {
        let component = <BrandStory data={componentData} outerSpacing={false} isCLP={true} isASCLP={props.theme== AS ? true : false} {...props} />;
        if (props.theme === (LP || AS))
            component = <MediaAndDescription data={componentData} {...props} isCLP={true} />;
        return <Fragment key={key}>
            {component}
        </Fragment>
    }

    if (componentData && componentData[":type"] === AEM_RECOMMENDATION && componentData["componentSelection"] === "new-arrivals") {
        let component;
        props.theme == AS ? component = <TrendingStylesAS data={componentData} {...props} productData={recomProducts} titleCenter={true} customClass={props.theme == AS ? true : false} algonomyPageName="clp"/> :
            component = <RecommendedProducts data={componentData} {...props} productData={recomProducts[getPlacementName(componentData.algonomyPlaceHolder, props.isMobile)]} titleCenter={true} />
        return <Fragment key={key}>
            {component}
        </Fragment>

    }
    if (componentData && componentData[":type"] === AEM_RECOMMENDATION && componentData["componentSelection"] === "recommend-you") {
        return <Fragment key={key}>
            <RecommendedProducts {...props} data={componentData} hideSimilarProducts={true} blurLastImage={true} productData={recomProducts[getPlacementName(componentData.algonomyPlaceHolder, props.isMobile)]} isAScollection={props.theme === AS ? true : false} customClassNameProduct={ props.theme === AS ? "collectionRecommendedProducts" : null}/>
        </Fragment>
    }
    if (componentData && componentData[":type"] === AEM_SHOPBY_LABELS) {
        return <Fragment key={key}>
            <ShopByLables data={componentData} {...props} productData={recomProducts} />
        </Fragment>
    }

    if (componentData && componentData[":type"] === AEM_HERO_BANNER) {
        let mobileDimension;
        if (props.theme === VH)
            mobileDimension = "d2";

        if (props.theme === LP  || props.theme === "AS")
            mobileDimension = "d3";

        return <Fragment key={key}>
            <BrandVideo data={componentData} {...props} isClp={true} imgDimension={props.theme === LP ? "d3" : null} mobileDimension={mobileDimension} />
        </Fragment>
    }

    if (componentData && componentData[":type"] === AEM_RECOMMENDATION && componentData["componentSelection"] === "product-list") {
        let isProductsForDesktopOnly = false;
        if (props.theme === LP && !props.isMobile)
            isProductsForDesktopOnly = true;

        return <Fragment key={key}>
            <SubCategory data={componentData} isProductsForDesktopOnly={isProductsForDesktopOnly} {...props} productData={recomProducts[getPlacementName(componentData.algonomyPlaceHolder, props.isMobile)]?.items} pageSource="clp"/>
        </Fragment>
    }

    if (componentData && componentData[":type"] === AEM_GENERIC_CONTAINER) {
        return <Fragment key={key}>
            <OneSuitAllOccasion data={componentData} {...props} />
        </Fragment>
    }

    if (componentData && componentData[":type"] === AEM_TOP_BOTTOM_IMAGE) {
        let sideSpace = false;
        let isoverlay = false;
        let isblueBackground = false;
        if (props.theme === LP && !props.isMobile)
            sideSpace = true
        if (props.theme === PE) {
            isoverlay = true;
            isblueBackground = true;
        }
        return <Fragment key={key}>
            <FullMediaText {...props} data={componentData} isImage={true} sideSpace={sideSpace} isblueBackground={true} isoverlay={true} isAScollection={props.theme === AS ? true : false} isCLP={true} isLPCollection = {props.theme === LP ? true : false}/>
        </Fragment>
    }


    if (componentData && componentData[":type"] === AEM_COLLECTION_BANNER) {
        return <Fragment key={key}>
            <ProductWithBanner {...props} data={componentData} />
        </Fragment>
    }
    if ((componentData && componentData[":type"] === AEM_SHOP_BY_OCASSION) && props.theme == AS && componentData.data[0]?.style == TOP) {
        return <Fragment key={key}>
            <ShopByCategory data={componentData} fullWidth={true} customShopByCategoryClass={"fromPeopleDimension"} blurLastImage={true} {...props} />
        </Fragment>
    }
    if (componentData && componentData[":type"] === AEM_SHOP_BY_OCASSION) {

        return <Fragment key={key}>
            {props.theme == AS ? <ShopByCategory data={componentData} fullWidth={true} customShopByCategoryClass="customShopByCategoryASInfants" blurLastImage={true} {...props} /> :
                <ShopByOccassion {...props} data={componentData} titleCenter={true} customClassCollection="shopByCollection" customClassName="peclp_card" isThreeCardsInRow={props.theme === PE ? true : null} />}
        </Fragment>
    }


    if (componentData && componentData[":type"] === AEM_SHOP_BY_CATEGORY) {
        let component;
        let fullWidth, removeSwiper;
        let hideHeader = false;
        let customShopByCategoryClass = "";
        if (props.theme === LP) {
            fullWidth = true;
            customShopByCategoryClass = "customShopByCategoryLPClass"
            if (props.isMobile) {
                customShopByCategoryClass = "customCircleImageCarousel";
                hideHeader = true
            }
        }
        if (props.isMobile)
            removeSwiper = true;


        if (props.theme === AS) {
           
            if (props.CategoryLandingData.title.toLowerCase() == "kids") {
                if(!props.isMobile) {
                    component = <CircularCardList {...props} data={componentData} isClpkids={true} />
                }
                else {
                    component = <CircleImageCarousel componentName={"kidsCircleCarousel"} isClpkids={true}  {...props} data={componentData} engageData={engageData} blurLastImage={true} />
                }
            }
            else  component = <CircleImageCarousel componentName={"shopMoreCategories"} {...props} data={componentData} engageData={engageData} blurLastImage={true} classNameCategoryGirls={"centerImageDiv"}/>
            
        }
        else if (props.theme === PE) {
            component = <CircularCardList data={componentData} customClass="category" {...props} />
        }
        else if (props.theme === AEO) {
            component = <CircularCardList data={componentData} customClass="category" {...props} />
        }
        else {
            component = <ShopByCategory removeSwiper={removeSwiper} data={componentData} customShopByCategoryClass={customShopByCategoryClass} hideHeader={hideHeader} {...props} fullWidth={fullWidth} engageData={engageData} />
        }

        return <Fragment key={key}>
            {component}

        </Fragment>
    }
    if (componentData && componentData[":type"] === AEM_DESIGNER_PICKS) {
        return <Fragment key={key}>
            <DesignersPicksAS data={componentData} {...props} isASCLP={props.theme == AS ? true : false} />
        </Fragment>
    }
    if (componentData && componentData[":type"] === AEM_DISCOVER_NEW) {
        return <Fragment key={key}>
            <DiscoverNewCollection data={componentData} {...props} productData={recomProducts} customClass="clpDiscover" />
        </Fragment>
    }
    if (componentData && componentData[":type"] === AEM_FLASHDEAL_BANNER) {
        return <Fragment key={key}>

            {componentData["componentSelection"] === "bannerWithTime" ? < DealsDayASCLP {...props} data={componentData} /> :
                <SubBannerCLP {...props} data={componentData} isASCLP={props.theme === AS ? true : false} />}

        </Fragment>
    }
    if (componentData && componentData[":type"] === AEM_SHOP_LOOK) {
        return <Fragment key={key}>
            <FromPeople data={componentData} {...props} productData={recomProducts} />
        </Fragment>
    }
    if (componentData && componentData[":type"] === AEM_SHOP_THE_LOOK) {
        return <Fragment key={key}>
            <ShopTheLook {...props} data={componentData} isASCLP={props.theme == AS ? true : false} />
        </Fragment>
    }
    if (componentData && componentData[":type"] === AEM_STYLE_UP) {
        return <Fragment key={key}>
            <StyleUp {...props} data={componentData} />
        </Fragment>
    }
    if (componentData && componentData[":type"] === AEM_OCCASSION_CAROUSEL) {
        return <Fragment key={key}>
            <ShopByOccasionAS {...props} data={componentData} />
        </Fragment>
    }
    if (componentData && componentData[":type"] === AEM_COLUMN_CONTROLLER) {
        return <Fragment key={key}>
            <ShopEssentials data={componentData} {...props} customClassName="asClpKids" />

        </Fragment>
    }
    if (componentData && componentData[":type"] === AEM_IMAGE_BANNERS) {
        return <Fragment key={key}>
            <SubBannerCLP data={componentData} {...props} isAScollection={props.theme === AS ? true : null} peclp={true} />

        </Fragment>
    }
    if (componentData && componentData[":type"] === AEM_SIGNUP_BANNER) {
        return <Fragment key={key}>
            <LocateStore data={componentData} {...props} />

        </Fragment>
    }
    if (componentData && componentData[":type"] === AEM_LP_BLOG && props.theme === AEO ) {

        return <Fragment key={key}>
                <Blog data={componentData} {...props}  componentName={"lpBlog"}/>
        </Fragment>
    }

    return null
}