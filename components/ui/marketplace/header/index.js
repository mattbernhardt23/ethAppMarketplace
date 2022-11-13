import { WalletBar, EthRates } from "@components/ui/web3"
import { Breadcrumbs } from "@components/ui/common"

const LINKS = [
    {
        href: "/marketplace",
        value: "Buy"
    },
    {
        href: "/marketplace/courses/owned",
        value: "My Courses"
    },
    {
        href: "/marketplace/courses/manage",
        value: "Manage Courses"
    },
]

export default function Header () {
    return (
    <>
        <WalletBar />
        <EthRates />
        <Breadcrumbs items={LINKS} />
    </>
    )
}