# 🛡️ Lab : Industrialiser la Sécurité avec Infrastructure as Code (IaC) – AWS CloudFormation

## 🎯 Objectifs pédagogiques

- Comprendre l’automatisation de l’infrastructure sécurisée avec CloudFormation.
- Savoir écrire, déployer, modifier et supprimer une stack CloudFormation.
- Maîtriser la création et la sécurisation d’un bucket S3, d’une clé KMS et d’une distribution CloudFront.
- Savoir valider chaque étape et analyser les politiques de sécurité générées.

---

## 🗺️ Plan du Lab

### 1. Introduction & Concepts

- **Qu’est-ce que l’IaC ?**  
  L’infrastructure as Code permet de gérer l’infrastructure comme du code : versionnable, reproductible, modifiable.
- **Pourquoi CloudFormation ?**  
  Pour automatiser, sécuriser et documenter l’infrastructure AWS.

---

### 2. Étape 1 : Création du Template Paramétré

**But** : Comprendre la structure d’un template CloudFormation.

- Crée un fichier `security-stack.yaml`.
- Ajoute la section `Parameters` pour rendre le nom du projet dynamique.
- Ajoute la section `Resources` (vide pour l’instant).
- Ajoute la section `Outputs` (vide pour l’instant).

**Exercice** :  
> Complète le template pour qu’il contienne les trois sections principales.

---

### 3. Étape 2 : Ajout de la Clé KMS

**But** : Sécuriser les données avec une clé de chiffrement dédiée.

- Ajoute la ressource `AWS::KMS::Key` avec une policy adaptée.
- Ajoute un alias pour la clé.

**Questions** :
- À quoi sert la KeyPolicy ?
- Pourquoi donner accès à CloudFront ?

**Validation** :
- Utilise la commande :  
  `aws cloudformation validate-template --template-body file://security-stack.yaml`
- Capture d’écran de la ressource KMS dans la console AWS.

---

### 4. Étape 3 : Création du Bucket S3 Sécurisé

**But** : Créer un bucket privé, chiffré avec la clé KMS.

- Ajoute la ressource `AWS::S3::Bucket` avec chiffrement KMS.
- Bloque tout accès public.

**Exercice** :
> Relie le bucket à la clé KMS créée précédemment.

**Validation** :
- Déploie la stack (voir guide d’exécution).
- Vérifie dans la console S3 que le bucket est privé et chiffré.

---

### 5. Étape 4 : Mise en place de CloudFront et OAC

**But** : Distribuer le contenu S3 de façon sécurisée via CloudFront.

- Ajoute la ressource `AWS::CloudFront::OriginAccessControl`.
- Ajoute la distribution `AWS::CloudFront::Distribution` pointant sur le bucket S3.

**Questions** :
- Pourquoi utiliser OAC ?
- Quelle différence avec un accès public S3 ?

**Validation** :
- Vérifie la création de la distribution dans la console CloudFront.
- Observe le temps de déploiement (CloudFront peut prendre plusieurs minutes).

---

### 6. Étape 5 : Politique de Bucket (Lien de confiance)

**But** : Autoriser uniquement CloudFront à lire le contenu du bucket.

- Ajoute la ressource `AWS::S3::BucketPolicy` pour lier S3 et CloudFront.

**Exercice** :
> Explique la condition `AWS:SourceArn` dans la policy.

**Validation** :
- Vérifie la policy dans l’onglet Permissions du bucket S3.

---

### 7. Étape 6 : Outputs et Test de l’Infrastructure

**But** : Récupérer les informations utiles et tester la sécurité.

- Ajoute les outputs pour afficher l’URL CloudFront et le nom du bucket.
- Charge un fichier `index.html` dans le bucket.
- Teste l’accès via l’URL S3 (doit être interdit) et via CloudFront (doit fonctionner).

**Validation** :
- Capture d’écran de l’output CloudFront.
- Test d’accès :  
  - S3 → Access Denied  
  - CloudFront → Page affichée

---

### 8. Étape 7 : Modification et Change Set

**But** : Comprendre le cycle de vie IaC (modification, mise à jour, rollback).

- Modifie le template (ex : change la description ou ajoute un tag).
- Utilise la fonction **Update** de CloudFormation.
- Observe le **Change Set** proposé avant d’appliquer.

**Questions** :
- Que montre le Change Set ?
- Pourquoi est-ce important en production ?

---

### 9. Étape 8 : Nettoyage

**But** : Supprimer proprement toutes les ressources.

- Vide le bucket S3.
- Supprime la stack via la console ou la CLI.

**Validation** :
- Toutes les ressources sont supprimées automatiquement.

---

## 🧩 Exercices complémentaires (pour aller plus loin)

- Ajoute un tag commun à toutes les ressources.
- Modifie le template pour rendre le nom du bucket encore plus unique (ex : ajoute un timestamp).
- Ajoute une ressource supplémentaire (ex : un bucket de logs S3).
- Propose un schéma d’architecture (ex : avec Mermaid).

---

## 🛠️ Guide d’exécution rapide

1. **Déploiement** :
   ```bash
   aws cloudformation deploy \
     --template-file security-stack.yaml \
     --stack-name lab-securite-complete \
     --capabilities CAPABILITY_IAM
   ```
2. **Ajout du contenu** :
   ```html
   <h1>Lab Securise - Succes !</h1>
   <p>Ce contenu est chiffre par KMS et servi par CloudFront via OAC.</p>
   ```
   ```bash
   aws s3 cp index.html s3://<nom-du-bucket>/
   ```
3. **Tests** :
   - Ouvre l’URL S3 → Access Denied
   - Ouvre l’URL CloudFront → Page affichée

---

## 📚 Ressources utiles

- [Documentation CloudFormation](https://docs.aws.amazon.com/fr_fr/AWSCloudFormation/latest/UserGuide/Welcome.html)
- [AWS CLI Reference](https://docs.aws.amazon.com/cli/latest/reference/cloudformation/index.html)
- [Exemple de Change Set](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-updating-stacks-changesets.html)

---

N’hésite pas à adapter ce plan selon le niveau de tes étudiants ou à ajouter des encadrés d’explications selon les besoins !