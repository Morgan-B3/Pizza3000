import { FaFireFlameCurved, FaShoppingCart, BsFillClipboard2PlusFill } from "react-icons/fa6";

const menus = [
    {
        icon : "<BsFillClipboard2PlusFill />",
        title: "Nouvelle commande",
        subtitle: "Créer et enregistrer une nouvelle commande",
        color: "blue",
        slug: "nouvelle-commande",
    },
    {
        icon : "<FaFireFlameCurved />",
        title: "Commandes en cours",
        subtitle: "Voir le détail des commandes en cours",
        color: "red",
        slug: "commandes",
    },
    {
        icon : "<FaShoppingCart />",
        title: "Paiement commande",
        subtitle: "Encaisser une commande",
        color: "green",
        slug: "paiement",
    },

];

export default menus;