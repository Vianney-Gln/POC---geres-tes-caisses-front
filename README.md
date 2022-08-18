# Application de gestion de caisses de transport 

En référence à mon ancien métier, je développe actuellement une application qui répondra à une problématique que j'ai pu rencontré.
Les caisses de transport sont déjà gérées par un logiciel très connu en logistique (REFLEX).

Ici il ne s'agit pas de le remplacer mais d'apporter un outil de gestion supplémentaire exclusif à la gestion des caisses qui aura pour but de faciliter leur gestion   par les opérateurs sur le terrain et d'améliorer la communiquation entre l'entreprise utilisatrice et le client.

# Les différences de fonctionnalités

Les fonctionnalités qui seront similaires à la gestion REFLEX:

- Créer une réception de caisses.
- Consulter le stock globale des caisses.

Les fonctionnalités non gérées avec REFLEX:
- Créer des fagots de 10 caisses d'une même longueur.
- Visualiser quelle(s) caisse(s) sont dans quels fagots.
- Visualiser les caisses qui ne sont pas encore en fagot.
- L'application tourne sur navigateur et est responsive, elle sera accessible aux opérateurs terrains qui disposent d'un smartphone.

# Une problématique de communiquation résolue

Une autre problématique importante est la communiquation entre les deux équipes chargées de la gestion des caisses ( départ --> arrivée).
Le client demande à l'équipe A (basée chez le client sans accés à REFLEX) de lui fournir un état des stocks toutes les semaines.
L'équipe A doit alors attendre que l'équipe B (qui est à l'entrepôt avec un accés à REFLEX) envoie les infos.
Avec cette application, l'équipe A a directement accés aux informations, à condition que l'équipe B travaille avec cette application.

# Note

L'application codée ici n'est encore qu'au début de son dévelopement.
Pour l'instant l'utilisateur peut consulter les stocks, mais ne peut pas encore créer de fagots ou faire une réception.


# Technologies utilisées

- React
- Express js
- MySql
- Scss


