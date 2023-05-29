import Filters from '@/components/Filters/Filters'
import MoviesTitle from '@/components/MoviesTitle/MoviesTitle'
import Breadcrumbs from '@/components/Breakcrumbs/Breadcrumbs'
import { FC } from 'react'
import Head from 'next/head'
import 'swiper/scss'
import { GetStaticProps } from 'next'
import DefaultCarousel from '@/stories/DefaultCarousel/DefaultCarousel'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Layout from '@/components/Layout/Layout'
import MovieService from '@/services/MovieService'

const Movies: FC<any> = ({ carousels, allFilters }) => {
    const { t, i18n } = useTranslation(['common', 'movies'])
    const breadcrumbsData = [
        { id: 1, title: t('myIvi'), href: '/' },
        { id: 2, title: t('movies'), href: '/movies' },
    ]

    return (
        <Layout>
            <Head>
                <title>
                    Смотреть фильмы онлайн бесплатно в хорошем HD качестве и без регистрации. Удобный просмотр онлайн
                    фильмов на ivi.ru
                </title>
            </Head>
            <Breadcrumbs breadcrumbsData={breadcrumbsData} />
            <MoviesTitle isActive={false} />
            <Filters allFilters={allFilters} />

            {carousels &&
                carousels.map((carousel: any, i: number) => {
                    const name = i18n.language === 'ru' ? carousel.names.nameRu : carousel.names.nameEn
                    return (
                        <DefaultCarousel
                            key={i}
                            title={name}
                            link={`/movies/${carousel.link}`}
                            dataList={carousel.data}
                        />
                    )
                })}
        </Layout>
    )
}

export default Movies

export const getStaticProps: GetStaticProps = async ({ locale }: any) => {
    const allFilters = await MovieService.getMoviesFilters()

    const carousel1 = await MovieService.getMoviesByQuery('drama', { nameEn: 'Best dramas', nameRu: 'Лучшие драмы' })
    const carousel2 = await MovieService.getMoviesByQuery('drama', { nameEn: 'Best dramas', nameRu: 'Лучшие драмы' })
    // const carousel3 = await MovieService.getMoviesByQuery('drama', { nameEn: 'Best dramas', nameRu: 'Лучшие драмы' })
    // const carousel4 = await MovieService.getMoviesByQuery('drama', { nameEn: 'Best dramas', nameRu: 'Лучшие драмы' })

    return {
        props: {
            carousels: [carousel1, carousel2],
            allFilters: allFilters,
            ...(await serverSideTranslations(locale as string, ['common', 'footer', 'header', 'movies'])),
        },
    }
}
