import { FaShoppingCart, } from "react-icons/fa";
import { FaFireFlameCurved } from "react-icons/fa6";
import { LuClipboardSignature } from "react-icons/lu";

const menus = [
    {
        icon : <LuClipboardSignature size={50} />,
        title: "Nouvelle commande",
        subtitle: "Créer et enregistrer une nouvelle commande",
        color: "blue",
        slug: "nouvelle-commande",
    },
    {
        icon : <FaFireFlameCurved size={50} />,
        title: "Commandes en cours",
        subtitle: "Voir le détail des commandes en cours",
        color: "red",
        slug: "commandes",
    },
    {
        icon : <FaShoppingCart size={50} />,
        title: "Paiement commande",
        subtitle: "Encaisser une commande",
        color: "green",
        slug: "paiement",
    },

];

export default menus;