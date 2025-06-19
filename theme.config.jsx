import { useRouter } from 'next/router'
import { useConfig } from 'nextra-theme-docs'

export default {
    logo: <div style={{ display: "flex", flexDirection: "row", gap: "1rem", verticalAlign: "middle", alignItems: "center" }}>
        <img src={"https://cdn.swiftlyac.net/favicon.png"} style={{ height: "62px" }} />
        <b>SwiftlyAC - Documentation</b>
    </div>,
    primaryHue: 196,
    projectLink: "https://swiftlyac.net",
    titleSuffix: "- SwiftlyAC",
    editLink: {
        component: null
    },
    feedback: {
        content: <></>,
        labels: ""
    },
    footer: {
        text: <></>,
        component: <></>
    },
    useNextSeoProps() {
        return {
            titleTemplate: '%s – SwiftlyAC'
        }
    },
    head: () => {
        const { asPath, defaultLocale, locale } = useRouter()
        const { frontMatter } = useConfig()
        const url =
            'https://docs.swiftlyac.net' +
            (defaultLocale === locale ? asPath : `/${locale}${asPath}`)

        return (
            <>
                <meta property="og:url" content={url} />
                <meta property="og:title" content={frontMatter.title || 'SwiftlyAC'} />
                <meta
                    property="og:description"
                    content={frontMatter.description || 'SwiftlyAC Documentation'}
                />
            </>
        )
    },
    sidebar: {
        titleComponent({ title, type }) {
            if (type === 'separator') {
                return <span className="cursor-default">{title}</span>
            }
            return <>{title}</>
        },
        defaultMenuCollapseLevel: 1,
        toggleButton: true
    },
    toc: {
        backToTop: true
    }
}