import React, { FC } from 'react'
import styles from './FilterSearch.module.scss'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'

const FilterSearch: FC<any> = ({ searchType }) => {
    const { t } = useTranslation(['movies'])
    const placeholderTitle =
        searchType === 'producer' ? t('searchByProducer') : t('searchByActor')

    const imgsrc =
        'https://avatars.mds.yandex.net/get-kinopoisk-image/1773646/c5eef897-dfb2-42a3-bc17-d5346f5dc587/280x420'

    return (
        <div className={styles.wrapper}>
            <div className={styles.input}>
                <input type="text" placeholder={placeholderTitle} />
            </div>
            <div className={styles.dropdown}>
                <ul>
                    <li className={styles.person}>
                        <Image
                            alt="персон нейм"
                            src={imgsrc}
                            width={35}
                            height={50}
                        />
                        <div>
                            <p>Квентин Тарантино</p>
                            <span>Режиссер, сценарист</span>
                        </div>
                    </li>
                    <li className={styles.person}>
                        <Image
                            alt="персон нейм"
                            src={imgsrc}
                            width={35}
                            height={50}
                        />
                        <div>
                            <p>Квентин Тарантино</p>
                            <span>Режиссер, сценарист</span>
                        </div>
                    </li>
                    <li className={styles.person}>
                        <Image
                            alt="персон нейм"
                            src={imgsrc}
                            width={35}
                            height={50}
                        />
                        <div>
                            <p>Квентин Тарантино</p>
                            <span>Режиссер, сценарист</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default FilterSearch
