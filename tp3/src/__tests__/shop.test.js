const { getUser, getNumero, getInfoProduit } = require("../shop");

const fakeUsers = require("../__mocks__/fakeUserValid.json");
const usersAgeStr = require("../__mocks__/usersAgeStr.json");
const fakeListProduct = require("../__mocks__/categorieProduit.json");
const listStockNeg = require("../__mocks__/categorieProduitStockNeg.json");
const listStockInt = require("../__mocks__/categorieInt.json");
const listStockReal = require("../__mocks__/categorieReal.json");

const RealUsers = require("../users.json");
const RealProduct = require("../products.json");

describe("shop.js", () => {

  // Test pour la fonction getUser()
  describe("getUser", () => {
    it("Doit retourner le bon user", () => {
      const res = getUser(1, fakeUsers);
      expect(res).toBe(fakeUsers[0]);
    });
    it("Doit renvoyer une erreur car l'utilisateur n'existe pas", () => {
      expect(() => {
        getUser(10, fakeUsers);
      }).toThrow("L'utilisateur 10 n'existe pas!");
    });
    it("Doit throw une erreur car l'identifiant passé en parametre est du mauvais type", () => {
      expect(() => {
        getUser("toto", 2);
      }).toThrow("L'identifiant doit être un entier positif");
    });
    it("Doit throw une erreur car la liste des utilisateur est du mauvais type", () => {
      expect(() => {
        getUser(1, "liste");
      }).toThrow(
        "La liste des utilisateur doit être un tableau contenant des utilisateurs"
      );
    });
    it("Doit throw une erreur car la liste des utilisateur ne doit pas être vide", () => {
      expect(() => {
        getUser(1, []);
      }).toThrow("La liste des utilisateur est vide");
    });
    it("Doit throw une erreur car l'id est invalide", () => {
      expect(() => {
        getUser(-1, fakeUsers);
      }).toThrow("L'identifiant doit être un entier positif");
    });
  });

  // Test pour la fonction getNumero
  describe("getNumero", () => {
    it("Doit retourner la liste avec le numéro de téléphone des personnes de 50 ans", () => {
      const res = getNumero(RealUsers);
      expect(res).toStrictEqual(["+63 791 675 8914", "+55 539 822 6581", "+62 406 110 4091"]);
    }); 
    it("Doit throw une erreur car la liste des utilisateur est du mauvais type", () => {
      expect(() => {
        getNumero("liste");
      }).toThrow(
        "La liste des utilisateur doit être un tableau contenant des utilisateurs"
      );
    });
    it("Doit throw une erreur car la liste des utilisateur ne doit pas être vide", () => {
      expect(() => {
        getNumero([]);
      }).toThrow("La liste des utilisateur est vide");
    });
    it("Doit throw une erreur car l'age ne peut pas être une chaine de caractère", () => {
      expect(() => {
        getNumero(usersAgeStr);
      }).toThrow("L'age est un string");
    });
  });

  // Test pour la fonction getInfoProduit
  describe("getInfoProduit", () => {
    it("Doit retourner la liste avec l'ensemble des produits classés par catégories'", () => {
      const res = getInfoProduit(RealProduct);
      expect(res).toStrictEqual(fakeListProduct);
    }); 
    it("Doit throw une erreur car la liste des produits est du mauvais type", () => {
      expect(() => {
        getInfoProduit("liste");
      }).toThrow(
        "La liste des produits doit être un tableau contenant des produits"
      );
    });
    it("Doit throw une erreur car la liste des produits ne doit pas être vide", () => {
      expect(() => {
        getInfoProduit([]);
      }).toThrow("La liste des produits est vide");
    });
    it("Doit throw une erreur car la liste des produits ne doit pas être vide", () => {
      expect(() => {
        getInfoProduit(listStockNeg);
      }).toThrow("Le stock est négatif, vous devez des produits");
    });
    it("Doit throw une erreur car la liste des produits ne doit pas être vide", () => {
      expect(() => {
        getInfoProduit(listStockInt);
      }).toThrow("La catégorie est un entier");
    });
    it("Doit throw une erreur car la liste des produits ne doit pas être vide", () => {
      expect(() => {
        getInfoProduit(listStockReal);
      }).toThrow("La catégorie est un entier");
    });
  });
});
