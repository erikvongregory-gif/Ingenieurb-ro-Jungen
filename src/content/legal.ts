import type { Locale } from "@/i18n/routing";

/**
 * Rechtstexte (Impressum / Haftungsausschluss).
 * NAP-/USt-Daten kommen aus der zentralen Site-Konfiguration, die Prosa ist
 * hier zweisprachig gepflegt (Content vom Design getrennt).
 */

export type LegalSection = { heading: string; paragraphs: string[] };

export type ImprintContent = {
  ownerIntro: string;
  phoneLabel: string;
  emailLabel: string;
  vatLabel: string;
  editorialLabel: string;
  disclaimerHeading: string;
  sections: LegalSection[];
};

export const imprint: Record<Locale, ImprintContent> = {
  de: {
    ownerIntro:
      "Inhaber der Domains ib-jungen.de / all-about-industrial-automation.de und inhaltlich verantwortlich ist:",
    phoneLabel: "Mobil",
    emailLabel: "E-Mail",
    vatLabel:
      "Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:",
    editorialLabel: "Redaktionelle Verantwortung",
    disclaimerHeading: "Haftungsausschluss",
    sections: [
      {
        heading: "Inhalt des Onlineangebots",
        paragraphs: [
          "Der Autor übernimmt keinerlei Gewähr für die Aktualität, Korrektheit, Vollständigkeit oder Qualität der bereitgestellten Informationen.",
        ],
      },
      {
        heading: "Urheber- und Kennzeichenrecht",
        paragraphs: [
          "Der Autor ist bestrebt, in allen Publikationen die Urheberrechte der verwendeten Grafiken und Texte zu beachten, von ihm selbst erstellte Grafiken und Texte zu nutzen oder auf lizenzfreie Grafiken und Texte zurückzugreifen. Alle innerhalb des Internetangebots genannten und ggf. durch Dritte geschützten Marken- und Warenzeichen unterliegen uneingeschränkt den Bestimmungen des jeweils gültigen Kennzeichenrechts und den Besitzrechten der jeweiligen eingetragenen Eigentümer. Allein aufgrund der bloßen Nennung ist nicht der Schluss zu ziehen, dass Markenzeichen nicht durch Rechte Dritter geschützt sind! Das Copyright für veröffentlichte, vom Autor selbst erstellte Objekte bleibt allein beim Autor der Seiten. Eine Vervielfältigung oder Verwendung solcher Grafiken und Texte in anderen elektronischen oder gedruckten Publikationen ist ohne ausdrückliche Zustimmung des Autors nicht gestattet.",
        ],
      },
      {
        heading: "Verweise und Links",
        paragraphs: [
          "Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.",
        ],
      },
      {
        heading: "Rechtswirksamkeit",
        paragraphs: [
          "Dieser Haftungsausschluss ist als Teil des Internetangebots zu betrachten, von dem aus auf diese Seiten verwiesen wurde. Sofern Teile oder einzelne Formulierungen dieses Textes der geltenden Rechtslage nicht, nicht mehr oder nicht vollständig entsprechen sollten, bleiben die übrigen Teile des Dokumentes in ihrem Inhalt und ihrer Gültigkeit davon unberührt.",
        ],
      },
    ],
  },
  en: {
    ownerIntro:
      "Owner of the domains ib-jungen.de / all-about-industrial-automation.de and responsible for the content is:",
    phoneLabel: "Mobile",
    emailLabel: "E-mail",
    vatLabel:
      "VAT identification number pursuant to § 27a German VAT Act (UStG):",
    editorialLabel: "Editorial responsibility",
    disclaimerHeading: "Disclaimer",
    sections: [
      {
        heading: "Content of the online offering",
        paragraphs: [
          "The author assumes no liability whatsoever for the timeliness, correctness, completeness or quality of the information provided.",
        ],
      },
      {
        heading: "Copyright and trademark law",
        paragraphs: [
          "The author endeavours to observe the copyrights of the graphics and texts used in all publications, to use graphics and texts created by himself or to draw on licence-free graphics and texts. All brands and trademarks mentioned within the website and possibly protected by third parties are subject without restriction to the provisions of the applicable trademark law and the ownership rights of the respective registered owners. The mere mention does not imply that trademarks are not protected by the rights of third parties. The copyright for published objects created by the author himself remains solely with the author of the pages. Any duplication or use of such graphics and texts in other electronic or printed publications is not permitted without the author's express consent.",
        ],
      },
      {
        heading: "References and links",
        paragraphs: [
          "Despite careful content control, we assume no liability for the content of external links. The operators of the linked pages are solely responsible for their content.",
        ],
      },
      {
        heading: "Legal validity",
        paragraphs: [
          "This disclaimer is to be regarded as part of the website from which reference was made to these pages. Should parts or individual formulations of this text not, no longer or not completely correspond to the applicable legal situation, the remaining parts of the document remain unaffected in their content and validity.",
        ],
      },
    ],
  },
};

export function getImprint(locale: Locale): ImprintContent {
  return imprint[locale];
}

/* -------------------------------------------------------------------------- */
/* Datenschutzerklärung                                                        */
/* -------------------------------------------------------------------------- */

export type PrivacyBlock = {
  /** Optionale Unterüberschrift (h3). */
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type PrivacySection = {
  /** Abschnittsüberschrift (h2), z. B. "1. Datenschutz auf einen Blick". */
  heading: string;
  blocks: PrivacyBlock[];
};

export type PrivacyContent = {
  sections: PrivacySection[];
};

export const privacy: Record<Locale, PrivacyContent> = {
  de: {
    sections: [
      {
        heading: "1. Datenschutz auf einen Blick",
        blocks: [
          {
            heading: "Allgemeine Hinweise",
            paragraphs: [
              "Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie unsere Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.",
            ],
          },
          { heading: "Datenerfassung auf unserer Website" },
          {
            heading:
              "Wer ist verantwortlich für die Datenerfassung auf dieser Website?",
            paragraphs: [
              "Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.",
            ],
          },
          {
            heading: "Wie erfassen wir Ihre Daten?",
            paragraphs: [
              "Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben.",
              "Andere Daten werden automatisch beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie unsere Website betreten.",
            ],
          },
          {
            heading: "Wofür nutzen wir Ihre Daten?",
            paragraphs: [
              "Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.",
            ],
          },
          {
            heading: "Welche Rechte haben Sie bezüglich Ihrer Daten?",
            paragraphs: [
              "Sie haben jederzeit das Recht unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung, Sperrung oder Löschung dieser Daten zu verlangen. Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.",
              "Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Details hierzu entnehmen Sie der Datenschutzerklärung unter „Recht auf Einschränkung der Verarbeitung“.",
            ],
          },
          {
            heading: "Analyse-Tools und Tools von Drittanbietern",
            paragraphs: [
              "Beim Besuch unserer Website kann Ihr Surf-Verhalten statistisch ausgewertet werden. Das geschieht vor allem mit Cookies und mit sogenannten Analyseprogrammen. Die Analyse Ihres Surf-Verhaltens erfolgt in der Regel anonym; das Surf-Verhalten kann nicht zu Ihnen zurückverfolgt werden. Sie können dieser Analyse widersprechen oder sie durch die Nichtbenutzung bestimmter Tools verhindern. Detaillierte Informationen dazu finden Sie in der folgenden Datenschutzerklärung.",
              "Sie können dieser Analyse widersprechen. Über die Widerspruchsmöglichkeiten werden wir Sie in dieser Datenschutzerklärung informieren.",
            ],
          },
        ],
      },
      {
        heading: "2. Allgemeine Hinweise und Pflichtinformationen",
        blocks: [
          {
            heading: "Datenschutz",
            paragraphs: [
              "Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.",
              "Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können. Die vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht.",
              "Wir weisen darauf hin, dass die Datenübertragung im Internet (z. B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.",
            ],
          },
          {
            heading: "Hinweis zur verantwortlichen Stelle",
            paragraphs: [
              "Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:",
            ],
            bullets: [
              "Ingenieurbüro Jungen",
              "Hauptstraße 32",
              "86925 Fuchstal-Leeder",
              "Telefon: +49 172 566 9504",
              "E-Mail: info@ib-jungen.de",
            ],
          },
          {
            paragraphs: [
              "Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z. B. Namen, E-Mail-Adressen o. Ä.) entscheidet.",
            ],
          },
          {
            heading: "Widerruf Ihrer Einwilligung zur Datenverarbeitung",
            paragraphs: [
              "Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Dazu reicht eine formlose Mitteilung per E-Mail an uns. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.",
            ],
          },
          {
            heading:
              "Widerspruchsrecht gegen die Datenerhebung in besonderen Fällen sowie gegen Direktwerbung (Art. 21 DSGVO)",
            paragraphs: [
              "Wenn die Datenverarbeitung auf Grundlage von Art. 6 Abs. 1 lit. e oder f DSGVO erfolgt, haben Sie jederzeit das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, gegen die Verarbeitung Ihrer personenbezogenen Daten Widerspruch einzulegen; dies gilt auch für ein auf diese Bestimmungen gestütztes Profiling. Die jeweilige Rechtsgrundlage, auf denen eine Verarbeitung beruht, entnehmen Sie dieser Datenschutzerklärung. Wenn Sie Widerspruch einlegen, werden wir Ihre betroffenen personenbezogenen Daten nicht mehr verarbeiten, es sei denn, wir können zwingende schutzwürdige Gründe für die Verarbeitung nachweisen, die Ihre Interessen, Rechte und Freiheiten überwiegen oder die Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen (Widerspruch nach Art. 21 Abs. 1 DSGVO).",
              "Werden Ihre personenbezogenen Daten verarbeitet, um Direktwerbung zu betreiben, so haben Sie das Recht, jederzeit Widerspruch gegen die Verarbeitung Sie betreffender personenbezogener Daten zum Zwecke derartiger Werbung einzulegen; dies gilt auch für das Profiling, soweit es mit solcher Direktwerbung in Verbindung steht. Wenn Sie widersprechen, werden Ihre personenbezogenen Daten anschließend nicht mehr zum Zwecke der Direktwerbung verwendet (Widerspruch nach Art. 21 Abs. 2 DSGVO).",
            ],
          },
          {
            heading: "Beschwerderecht bei der zuständigen Aufsichtsbehörde",
            paragraphs: [
              "Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres gewöhnlichen Aufenthalts, ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes zu. Das Beschwerderecht besteht unbeschadet anderweitiger verwaltungsrechtlicher oder gerichtlicher Rechtsbehelfe.",
            ],
          },
          {
            heading: "Recht auf Datenübertragbarkeit",
            paragraphs: [
              "Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen, maschinenlesbaren Format aushändigen zu lassen. Sofern Sie die direkte Übertragung der Daten an einen anderen Verantwortlichen verlangen, erfolgt dies nur, soweit es technisch machbar ist.",
            ],
          },
          {
            heading: "SSL- bzw. TLS-Verschlüsselung",
            paragraphs: [
              "Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie zum Beispiel Bestellungen oder Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://“ auf „https://“ wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.",
              "Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie an uns übermitteln, nicht von Dritten mitgelesen werden.",
            ],
          },
          {
            heading: "Auskunft, Sperrung, Löschung und Berichtigung",
            paragraphs: [
              "Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden.",
            ],
          },
          {
            heading: "Recht auf Einschränkung der Verarbeitung",
            paragraphs: [
              "Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Hierzu können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden. Das Recht auf Einschränkung der Verarbeitung besteht in folgenden Fällen:",
            ],
            bullets: [
              "Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten personenbezogenen Daten bestreiten, benötigen wir in der Regel Zeit, um dies zu überprüfen. Für die Dauer der Prüfung haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.",
              "Wenn die Verarbeitung Ihrer personenbezogenen Daten unrechtmäßig geschah / geschieht, können Sie statt der Löschung die Einschränkung der Datenverarbeitung verlangen.",
              "Wenn wir Ihre personenbezogenen Daten nicht mehr benötigen, Sie sie jedoch zur Ausübung, Verteidigung oder Geltendmachung von Rechtsansprüchen benötigen, haben Sie das Recht, statt der Löschung die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.",
              "Wenn Sie einen Widerspruch nach Art. 21 Abs. 1 DSGVO eingelegt haben, muss eine Abwägung zwischen Ihren und unseren Interessen vorgenommen werden. Solange noch nicht feststeht, wessen Interessen überwiegen, haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.",
            ],
          },
          {
            paragraphs: [
              "Wenn Sie die Verarbeitung Ihrer personenbezogenen Daten eingeschränkt haben, dürfen diese Daten – von ihrer Speicherung abgesehen – nur mit Ihrer Einwilligung oder zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen oder zum Schutz der Rechte einer anderen natürlichen oder juristischen Person oder aus Gründen eines wichtigen öffentlichen Interesses der Europäischen Union oder eines Mitgliedstaats verarbeitet werden.",
            ],
          },
          {
            heading: "Widerspruch gegen Werbe-E-Mails",
            paragraphs: [
              "Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten zur Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit widersprochen. Die Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung von Werbeinformationen, etwa durch Spam-E-Mails, vor.",
            ],
          },
        ],
      },
      {
        heading: "3. Datenerfassung auf unserer Website",
        blocks: [
          {
            heading: "Cookies",
            paragraphs: [
              "Die Internetseiten verwenden teilweise so genannte Cookies. Cookies richten auf Ihrem Rechner keinen Schaden an und enthalten keine Viren. Cookies dienen dazu, unser Angebot nutzerfreundlicher, effektiver und sicherer zu machen. Cookies sind kleine Textdateien, die auf Ihrem Rechner abgelegt werden und die Ihr Browser speichert.",
              "Die meisten der von uns verwendeten Cookies sind so genannte „Session-Cookies“. Sie werden nach Ende Ihres Besuchs automatisch gelöscht. Andere Cookies bleiben auf Ihrem Endgerät gespeichert, bis Sie diese löschen. Diese Cookies ermöglichen es uns, Ihren Browser beim nächsten Besuch wiederzuerkennen.",
              "Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden und Cookies nur im Einzelfall erlauben, die Annahme von Cookies für bestimmte Fälle oder generell ausschließen sowie das automatische Löschen der Cookies beim Schließen des Browsers aktivieren. Bei der Deaktivierung von Cookies kann die Funktionalität dieser Website eingeschränkt sein.",
              "Cookies, die zur Durchführung des elektronischen Kommunikationsvorgangs oder zur Bereitstellung bestimmter, von Ihnen erwünschter Funktionen (z. B. Warenkorbfunktion) erforderlich sind, werden auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO gespeichert. Der Websitebetreiber hat ein berechtigtes Interesse an der Speicherung von Cookies zur technisch fehlerfreien und optimierten Bereitstellung seiner Dienste. Soweit andere Cookies (z. B. Cookies zur Analyse Ihres Surfverhaltens) gespeichert werden, werden diese in dieser Datenschutzerklärung gesondert behandelt.",
            ],
          },
          {
            heading: "Server-Log-Dateien",
            paragraphs: [
              "Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:",
            ],
            bullets: [
              "Browsertyp und Browserversion",
              "verwendetes Betriebssystem",
              "Referrer URL",
              "Hostname des zugreifenden Rechners",
              "Uhrzeit der Serveranfrage",
              "IP-Adresse",
            ],
          },
          {
            paragraphs: [
              "Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.",
              "Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an der technisch fehlerfreien Darstellung und der Optimierung seiner Website – hierzu müssen die Server-Log-Files erfasst werden.",
            ],
          },
        ],
      },
      {
        heading: "4. Analyse-Tools und Werbung",
        blocks: [
          {
            heading: "Google Analytics",
            paragraphs: [
              "Diese Website nutzt Funktionen des Webanalysedienstes Google Analytics. Anbieter ist die Google Inc., 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA.",
              "Google Analytics verwendet so genannte „Cookies“. Das sind Textdateien, die auf Ihrem Computer gespeichert werden und die eine Analyse der Benutzung der Website durch Sie ermöglichen. Die durch den Cookie erzeugten Informationen über Ihre Benutzung dieser Website werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert.",
              "Die Speicherung von Google-Analytics-Cookies und die Nutzung dieses Analyse-Tools erfolgen auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an der Analyse des Nutzerverhaltens, um sowohl sein Webangebot als auch seine Werbung zu optimieren.",
            ],
          },
          {
            heading: "Browser Plugin",
            paragraphs: [
              "Sie können die Speicherung der Cookies durch eine entsprechende Einstellung Ihrer Browser-Software verhindern; wir weisen Sie jedoch darauf hin, dass Sie in diesem Fall gegebenenfalls nicht sämtliche Funktionen dieser Website vollumfänglich werden nutzen können. Sie können darüber hinaus die Erfassung der durch den Cookie erzeugten und auf Ihre Nutzung der Website bezogenen Daten (inkl. Ihrer IP-Adresse) an Google sowie die Verarbeitung dieser Daten durch Google verhindern, indem Sie das unter dem folgenden Link verfügbare Browser-Plugin herunterladen und installieren: https://tools.google.com/dlpage/gaoptout?hl=de",
            ],
          },
          {
            heading: "Widerspruch gegen Datenerfassung",
            paragraphs: [
              "Sie können die Erfassung Ihrer Daten durch Google Analytics verhindern, indem Sie Ihre Einwilligung widerrufen bzw. die entsprechenden Cookies nicht zulassen. Es wird dann ein Opt-Out gesetzt, der die Erfassung Ihrer Daten bei zukünftigen Besuchen dieser Website verhindert.",
              "Mehr Informationen zum Umgang mit Nutzerdaten bei Google Analytics finden Sie in der Datenschutzerklärung von Google: https://support.google.com/analytics/answer/6004245?hl=de",
            ],
          },
        ],
      },
      {
        heading: "5. Newsletter",
        blocks: [
          {
            heading: "Newsletterdaten",
            paragraphs: [
              "Wenn Sie den auf der Website angebotenen Newsletter beziehen möchten, benötigen wir von Ihnen eine E-Mail-Adresse sowie Informationen, welche uns die Überprüfung gestatten, dass Sie der Inhaber der angegebenen E-Mail-Adresse sind und mit dem Empfang des Newsletters einverstanden sind. Weitere Daten werden nicht bzw. nur auf freiwilliger Basis erhoben. Diese Daten verwenden wir ausschließlich für den Versand der angeforderten Informationen und geben diese nicht an Dritte weiter.",
              "Die Verarbeitung der in das Newsletteranmeldeformular eingegebenen Daten erfolgt ausschließlich auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Die erteilte Einwilligung zur Speicherung der Daten, der E-Mail-Adresse sowie deren Nutzung zum Versand des Newsletters können Sie jederzeit widerrufen, etwa über den „Austragen“-Link im Newsletter. Die Rechtmäßigkeit der bereits erfolgten Datenverarbeitungsvorgänge bleibt vom Widerruf unberührt.",
              "Die von Ihnen zum Zwecke des Newsletter-Bezugs bei uns hinterlegten Daten werden von uns bis zu Ihrer Austragung aus dem Newsletter gespeichert und nach der Abbestellung des Newsletters gelöscht. Daten, die zu anderen Zwecken bei uns gespeichert wurden, bleiben hiervon unberührt.",
            ],
          },
        ],
      },
      {
        heading: "6. Plugins und Tools",
        blocks: [
          {
            heading: "Google Maps",
            paragraphs: [
              "Diese Seite nutzt über eine API den Kartendienst Google Maps. Anbieter ist die Google Inc., 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA.",
              "Zur Nutzung der Funktionen von Google Maps ist es notwendig, Ihre IP-Adresse zu speichern. Diese Informationen werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert. Der Anbieter dieser Seite hat keinen Einfluss auf diese Datenübertragung.",
              "Die Nutzung von Google Maps erfolgt im Interesse einer ansprechenden Darstellung unserer Online-Angebote und an einer leichten Auffindbarkeit der von uns auf der Website angegebenen Orte. Dies stellt ein berechtigtes Interesse im Sinne von Art. 6 Abs. 1 lit. f DSGVO dar.",
              "Mehr Informationen zum Umgang mit Nutzerdaten finden Sie in der Datenschutzerklärung von Google: https://policies.google.com/privacy?hl=de",
            ],
          },
        ],
      },
    ],
  },
  en: {
    sections: [
      {
        heading: "1. Privacy at a glance",
        blocks: [
          {
            heading: "General information",
            paragraphs: [
              "The following information provides a simple overview of what happens to your personal data when you visit our website. Personal data is any data that can be used to identify you personally. For detailed information on data protection, please refer to our privacy policy set out below this text.",
            ],
          },
          { heading: "Data collection on our website" },
          {
            heading:
              "Who is responsible for data collection on this website?",
            paragraphs: [
              "Data processing on this website is carried out by the website operator. You can find their contact details in the legal notice (Impressum) of this website.",
            ],
          },
          {
            heading: "How do we collect your data?",
            paragraphs: [
              "Your data is collected on the one hand by you providing it to us. This may, for example, be data you enter in a contact form.",
              "Other data is collected automatically by our IT systems when you visit the website. This is mainly technical data (e.g. internet browser, operating system or time of the page request). This data is collected automatically as soon as you enter our website.",
            ],
          },
          {
            heading: "What do we use your data for?",
            paragraphs: [
              "Some of the data is collected to ensure the website is provided without errors. Other data may be used to analyse your user behaviour.",
            ],
          },
          {
            heading: "What rights do you have regarding your data?",
            paragraphs: [
              "You have the right to receive information about the origin, recipients and purpose of your stored personal data free of charge at any time. You also have the right to request the correction, blocking or deletion of this data. You can contact us at any time at the address given in the legal notice for this purpose and for further questions on the subject of data protection. Furthermore, you have the right to lodge a complaint with the competent supervisory authority.",
              "In addition, under certain circumstances you have the right to request the restriction of the processing of your personal data. For details, please refer to the privacy policy under “Right to restriction of processing”.",
            ],
          },
          {
            heading: "Analysis tools and third-party tools",
            paragraphs: [
              "When you visit our website, your browsing behaviour may be statistically evaluated. This is done primarily with cookies and so-called analysis programs. The analysis of your browsing behaviour is generally anonymous; browsing behaviour cannot be traced back to you. You can object to this analysis or prevent it by not using certain tools. You will find detailed information in the following privacy policy.",
              "You can object to this analysis. We will inform you about the options for objecting in this privacy policy.",
            ],
          },
        ],
      },
      {
        heading: "2. General information and mandatory information",
        blocks: [
          {
            heading: "Data protection",
            paragraphs: [
              "The operators of these pages take the protection of your personal data very seriously. We treat your personal data confidentially and in accordance with the statutory data protection regulations and this privacy policy.",
              "When you use this website, various personal data is collected. Personal data is data that can be used to identify you personally. This privacy policy explains what data we collect and what we use it for. It also explains how and for what purpose this is done.",
              "We point out that data transmission over the internet (e.g. when communicating by e-mail) can have security gaps. Complete protection of data against access by third parties is not possible.",
            ],
          },
          {
            heading: "Note on the responsible party",
            paragraphs: [
              "The party responsible for data processing on this website is:",
            ],
            bullets: [
              "Ingenieurbüro Jungen",
              "Hauptstraße 32",
              "86925 Fuchstal-Leeder",
              "Phone: +49 172 566 9504",
              "E-mail: info@ib-jungen.de",
            ],
          },
          {
            paragraphs: [
              "The responsible party is the natural or legal person who alone or jointly with others decides on the purposes and means of processing personal data (e.g. names, e-mail addresses, etc.).",
            ],
          },
          {
            heading: "Revocation of your consent to data processing",
            paragraphs: [
              "Many data processing operations are only possible with your express consent. You can revoke consent you have already given at any time. An informal notification by e-mail is sufficient. The legality of the data processing carried out until the revocation remains unaffected by the revocation.",
            ],
          },
          {
            heading:
              "Right to object to data collection in special cases and to direct marketing (Art. 21 GDPR)",
            paragraphs: [
              "If data processing is based on Art. 6(1)(e) or (f) GDPR, you have the right at any time to object, on grounds relating to your particular situation, to the processing of your personal data; this also applies to profiling based on these provisions. The respective legal basis on which processing is based can be found in this privacy policy. If you object, we will no longer process your affected personal data unless we can demonstrate compelling legitimate grounds for the processing which override your interests, rights and freedoms, or the processing serves to assert, exercise or defend legal claims (objection under Art. 21(1) GDPR).",
              "If your personal data is processed for direct marketing purposes, you have the right to object at any time to the processing of personal data concerning you for such marketing; this also applies to profiling insofar as it is related to such direct marketing. If you object, your personal data will subsequently no longer be used for direct marketing purposes (objection under Art. 21(2) GDPR).",
            ],
          },
          {
            heading: "Right to lodge a complaint with the competent supervisory authority",
            paragraphs: [
              "In the event of violations of the GDPR, data subjects have the right to lodge a complaint with a supervisory authority, in particular in the member state of their habitual residence, place of work or place of the alleged violation. The right to lodge a complaint exists without prejudice to other administrative or judicial remedies.",
            ],
          },
          {
            heading: "Right to data portability",
            paragraphs: [
              "You have the right to have data that we process automatically on the basis of your consent or in performance of a contract handed over to you or to a third party in a common, machine-readable format. If you request the direct transfer of the data to another controller, this will only be done insofar as it is technically feasible.",
            ],
          },
          {
            heading: "SSL / TLS encryption",
            paragraphs: [
              "For security reasons and to protect the transmission of confidential content, such as orders or enquiries that you send to us as the site operator, this site uses SSL or TLS encryption. You can recognise an encrypted connection by the fact that the address bar of the browser changes from “http://” to “https://” and by the lock symbol in your browser bar.",
              "If SSL or TLS encryption is activated, the data you transmit to us cannot be read by third parties.",
            ],
          },
          {
            heading: "Information, blocking, deletion and correction",
            paragraphs: [
              "Within the framework of the applicable statutory provisions, you have the right at any time to free information about your stored personal data, its origin and recipients and the purpose of data processing and, if applicable, a right to correction, blocking or deletion of this data. You can contact us at any time at the address given in the legal notice for this purpose and for further questions on the subject of personal data.",
            ],
          },
          {
            heading: "Right to restriction of processing",
            paragraphs: [
              "You have the right to request the restriction of the processing of your personal data. You can contact us at any time at the address given in the legal notice. The right to restriction of processing exists in the following cases:",
            ],
            bullets: [
              "If you dispute the accuracy of your personal data stored by us, we usually need time to verify this. For the duration of the verification, you have the right to request the restriction of the processing of your personal data.",
              "If the processing of your personal data took place / takes place unlawfully, you can request the restriction of data processing instead of deletion.",
              "If we no longer need your personal data, but you need it to assert, defend or exercise legal claims, you have the right to request the restriction of the processing of your personal data instead of deletion.",
              "If you have lodged an objection under Art. 21(1) GDPR, a balance must be struck between your interests and ours. As long as it has not been determined whose interests prevail, you have the right to request the restriction of the processing of your personal data.",
            ],
          },
          {
            paragraphs: [
              "If you have restricted the processing of your personal data, this data may – apart from being stored – only be processed with your consent or for the assertion, exercise or defence of legal claims or for the protection of the rights of another natural or legal person or for reasons of important public interest of the European Union or a member state.",
            ],
          },
          {
            heading: "Objection to advertising e-mails",
            paragraphs: [
              "The use of contact data published within the framework of the legal notice obligation to send advertising and information materials not expressly requested is hereby objected to. The operators of the pages expressly reserve the right to take legal action in the event of the unsolicited sending of advertising information, for example through spam e-mails.",
            ],
          },
        ],
      },
      {
        heading: "3. Data collection on our website",
        blocks: [
          {
            heading: "Cookies",
            paragraphs: [
              "The websites partly use so-called cookies. Cookies do not cause any damage to your computer and do not contain viruses. Cookies serve to make our offering more user-friendly, effective and secure. Cookies are small text files that are stored on your computer and saved by your browser.",
              "Most of the cookies we use are so-called “session cookies”. They are automatically deleted at the end of your visit. Other cookies remain stored on your device until you delete them. These cookies enable us to recognise your browser on your next visit.",
              "You can set your browser so that you are informed about the setting of cookies and only allow cookies in individual cases, exclude the acceptance of cookies for certain cases or in general, and activate the automatic deletion of cookies when closing the browser. If cookies are deactivated, the functionality of this website may be limited.",
              "Cookies that are required to carry out the electronic communication process or to provide certain functions you have requested (e.g. shopping cart function) are stored on the basis of Art. 6(1)(f) GDPR. The website operator has a legitimate interest in storing cookies for the technically error-free and optimised provision of its services. Insofar as other cookies (e.g. cookies for analysing your browsing behaviour) are stored, these are treated separately in this privacy policy.",
            ],
          },
          {
            heading: "Server log files",
            paragraphs: [
              "The provider of the pages automatically collects and stores information in so-called server log files, which your browser automatically transmits to us. These are:",
            ],
            bullets: [
              "browser type and browser version",
              "operating system used",
              "referrer URL",
              "host name of the accessing computer",
              "time of the server request",
              "IP address",
            ],
          },
          {
            paragraphs: [
              "This data is not merged with other data sources.",
              "This data is collected on the basis of Art. 6(1)(f) GDPR. The website operator has a legitimate interest in the technically error-free presentation and optimisation of its website – for this purpose, the server log files must be recorded.",
            ],
          },
        ],
      },
      {
        heading: "4. Analysis tools and advertising",
        blocks: [
          {
            heading: "Google Analytics",
            paragraphs: [
              "This website uses functions of the web analytics service Google Analytics. The provider is Google Inc., 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA.",
              "Google Analytics uses so-called “cookies”. These are text files that are stored on your computer and enable an analysis of your use of the website. The information generated by the cookie about your use of this website is generally transmitted to a Google server in the USA and stored there.",
              "The storage of Google Analytics cookies and the use of this analysis tool are based on Art. 6(1)(f) GDPR. The website operator has a legitimate interest in analysing user behaviour in order to optimise both its website and its advertising.",
            ],
          },
          {
            heading: "Browser plugin",
            paragraphs: [
              "You can prevent the storage of cookies by setting your browser software accordingly; however, we point out that in this case you may not be able to use all functions of this website to their full extent. You can also prevent the collection of the data generated by the cookie and related to your use of the website (incl. your IP address) by Google and the processing of this data by Google by downloading and installing the browser plugin available under the following link: https://tools.google.com/dlpage/gaoptout?hl=en",
            ],
          },
          {
            heading: "Objection to data collection",
            paragraphs: [
              "You can prevent the collection of your data by Google Analytics by revoking your consent or not allowing the corresponding cookies. An opt-out is then set, which prevents the collection of your data on future visits to this website.",
              "More information on how Google Analytics handles user data can be found in Google's privacy policy: https://support.google.com/analytics/answer/6004245?hl=en",
            ],
          },
        ],
      },
      {
        heading: "5. Newsletter",
        blocks: [
          {
            heading: "Newsletter data",
            paragraphs: [
              "If you would like to receive the newsletter offered on the website, we require an e-mail address from you as well as information that allows us to verify that you are the owner of the e-mail address provided and that you agree to receive the newsletter. Further data is not collected, or only on a voluntary basis. We use this data exclusively for sending the requested information and do not pass it on to third parties.",
              "The processing of the data entered in the newsletter registration form is based exclusively on your consent (Art. 6(1)(a) GDPR). You can revoke your consent to the storage of the data, the e-mail address and its use for sending the newsletter at any time, for example via the “unsubscribe” link in the newsletter. The legality of the data processing operations already carried out remains unaffected by the revocation.",
              "The data you have provided to us for the purpose of receiving the newsletter will be stored by us until you unsubscribe from the newsletter and will be deleted after you unsubscribe. Data stored by us for other purposes remains unaffected by this.",
            ],
          },
        ],
      },
      {
        heading: "6. Plugins and tools",
        blocks: [
          {
            heading: "Google Maps",
            paragraphs: [
              "This site uses the map service Google Maps via an API. The provider is Google Inc., 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA.",
              "To use the functions of Google Maps, it is necessary to store your IP address. This information is generally transmitted to a Google server in the USA and stored there. The provider of this site has no influence on this data transmission.",
              "Google Maps is used in the interest of an appealing presentation of our online offerings and easy findability of the places we indicate on the website. This constitutes a legitimate interest within the meaning of Art. 6(1)(f) GDPR.",
              "More information on how user data is handled can be found in Google's privacy policy: https://policies.google.com/privacy?hl=en",
            ],
          },
        ],
      },
    ],
  },
};

export function getPrivacy(locale: Locale): PrivacyContent {
  return privacy[locale];
}
