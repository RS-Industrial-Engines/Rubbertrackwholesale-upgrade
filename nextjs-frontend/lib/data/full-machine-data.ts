// Auto-generated from compatibility_cleaned_UPDATED.csv
// Generated on: 2026-05-13T15:49:13.205Z
// Total machines: 4631
// Total brands: 349
// Total track sizes: 381

/**
 * Normalize a value for matching (lowercase, remove all non-alphanumeric)
 * This allows matching:
 * - "KX018-4" == "KX 018-4" == "kx0184" == "kx 018 4"
 * - "U17" == "U-17" == "u 17"
 */
export function normalizeForMatching(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, '');
}

/**
 * Check if two values match after normalization
 */
export function normalizedMatch(a: string, b: string): boolean {
  return normalizeForMatching(a) === normalizeForMatching(b);
}

/**
 * Check if a query matches a value (partial match after normalization)
 */
export function normalizedContains(value: string, query: string): boolean {
  return normalizeForMatching(value).includes(normalizeForMatching(query));
}

// Brand aliases for search
export const BRAND_ALIASES: Record<string, string[]> = {
  "cat": ["CAT", "Caterpillar"],
  "caterpillar": ["CAT", "Caterpillar"],
  "deere": ["John Deere"],
  "john deere": ["John Deere"],
  "nh": ["New Holland"],
  "new holland": ["New Holland"],
  "dw": ["Ditch-Witch", "Ditch Witch"],
  "ditch witch": ["Ditch-Witch", "Ditch Witch"],
  "ditch-witch": ["Ditch-Witch", "Ditch Witch"],
  "wacker": ["Wacker Neuson"],
  "wacker neuson": ["Wacker Neuson"],
  "jd": ["John Deere"],
};

/**
 * Resolve brand aliases
 */
export function resolveBrandAlias(brand: string): string[] {
  const normalized = brand.toLowerCase().trim();
  return BRAND_ALIASES[normalized] || [brand];
}

// All machine models grouped by brand
// Total: 4631 machines across 349 brands
export const fullMachineModels: Record<string, string[]> = {
  "A.X.I.": [
    "FR300AA (Crane)"
  ],
  "ACM": [
    "ME040"
  ],
  "ALLEN": [
    "AT14F",
    "AT16"
  ],
  "ALLtrack": [
    "AT1500",
    "AT2200"
  ],
  "ASV": [
    "MD-70",
    "POSI-TRAC 2800",
    "POSI-TRAC 2810",
    "POSI-TRAC 4800",
    "POSI-TRAC 4810",
    "POSI-TRAC HD4500",
    "POSI-TRAC HD4520",
    "PT 100",
    "PT 50",
    "PT 60",
    "PT 80",
    "RC 100",
    "RC 50",
    "RC 60",
    "RC 85",
    "RCV",
    "RT 50",
    "RT 65",
    "RT 75",
    "SC-50",
    "SR-80",
    "ST-50",
    "VT-70"
  ],
  "ATN": [
    "ATN | PIAF450 (Platform - non-marking tracks)",
    "ATN | PIAF560 (Platform - non-marking tracks)",
    "ATN | PIAF800 (Platform - non-marking tracks)",
    "ATN | PIAF810",
    "ATN | PIAF811"
  ],
  "Abbati": [
    "BBT954-5.16",
    "BBT954-5.17"
  ],
  "Aces": [
    "HTC500 (Dumper)"
  ],
  "Active": [
    "PT1300",
    "PT1320",
    "PT1460"
  ],
  "Agri": [
    "DM10"
  ],
  "Aichi": [
    "FR300 (Crane)",
    "RM040",
    "RV040 (Lifting platform)",
    "RV041 (Lifting platform)",
    "RV042 (Lifting platform)",
    "RV04A (Lifting platform)",
    "RV060 (Lifting platform)",
    "RV061 (Lifting platform)"
  ],
  "Airman": [
    "AX 17",
    "AX 17 - 2",
    "AX 17 - 2N",
    "AX 17CGL-2N",
    "AX 17U",
    "AX08",
    "AX08-02",
    "AX08-2KT",
    "AX08GL-2",
    "AX10U",
    "AX12",
    "AX12-2",
    "AX15",
    "AX15 U",
    "AX15-2",
    "AX16",
    "AX16-2",
    "AX16-3",
    "AX16CBL-3",
    "AX18-2",
    "AX19U",
    "AX20-3",
    "AX20U",
    "AX20UR",
    "AX22",
    "AX22-1",
    "AX22-2",
    "AX22CGL",
    "AX22UCGL",
    "AX22UCGL4",
    "AX25",
    "AX25-1",
    "AX25-2",
    "AX25-3",
    "AX26U-6",
    "AX27",
    "AX27U",
    "AX27U-4",
    "AX29UCGL",
    "AX30",
    "AX30-1",
    "AX30-2",
    "AX30-3",
    "AX30U-4",
    "AX30UR",
    "AX30UR-1",
    "AX30UR-2",
    "AX30UR-3",
    "AX32U",
    "AX33MU",
    "AX33U",
    "AX33U-6",
    "AX35",
    "AX35-1",
    "AX35-2",
    "AX35CGL-3",
    "AX35U",
    "AX35U-4",
    "AX36U",
    "AX36UCGL",
    "AX38UCGL",
    "AX40",
    "AX40-2",
    "AX40U",
    "AX40U-4",
    "AX40UR-1",
    "AX40UR-2",
    "AX45",
    "AX45-2",
    "AX45CGL-2",
    "AX50",
    "AX50-2",
    "AX50-3",
    "AX50U",
    "AX50U-4",
    "AX50UCGL",
    "AX52UCGL-5",
    "AX55U-6A",
    "AX55UR",
    "AX55UR-3",
    "AX58",
    "AX58MU",
    "AXC12",
    "AXC15",
    "HM07S",
    "HM10",
    "HM10 NEW",
    "HM10G",
    "HM10SG",
    "HM15",
    "HM15 NEW",
    "HM15S",
    "HM30SGZ",
    "HM35",
    "HM45",
    "HM45-2",
    "HM45SG-2",
    "HM50",
    "HM55"
  ],
  "Airman-Foredil": [
    "AX 16-2N",
    "AX 29U",
    "AX 35",
    "AX 45",
    "AX22"
  ],
  "Almac": [
    "Athena-870",
    "BIBI-1090EVO",
    "BIBI-1250CL",
    "BIBI-1470HE",
    "BIBI-850BL",
    "BIBI-850HE",
    "BIBI-870BL",
    "BIEASY1,5",
    "MULTI-LOADER 2.5"
  ],
  "Amerequip Eagle": [
    "TRAX40"
  ],
  "American Direction Drill": [
    "DD10",
    "DD2",
    "DD3",
    "DD4",
    "DD6",
    "DD8"
  ],
  "Ammann": [
    "AMX 65",
    "AMX85ZT"
  ],
  "Andreoli": [
    "UT60EVO"
  ],
  "Angel": [
    "WY1.3",
    "WY2.5",
    "WY3.5"
  ],
  "Antec": [
    "A12B",
    "A14sa",
    "HCC1051D"
  ],
  "Apageo": [
    "450 (H.D Drilling Machine)",
    "580 (H.D Drilling Machine)",
    "LWC100 ( Drilling Machine)"
  ],
  "Aros China": [
    "1.5"
  ],
  "Astec": [
    "Mini-Excavator"
  ],
  "Atex": [
    "XC750D",
    "XG450M"
  ],
  "Athena": [
    "1090 (Lifting Platform)"
  ],
  "Atlas": [
    "100",
    "100B",
    "100CT",
    "110",
    "1104",
    "120",
    "120AB",
    "120RF",
    "404",
    "404R",
    "604",
    "604.2",
    "604.2 (96)",
    "604R",
    "605R",
    "805R",
    "AM29R",
    "AM37R",
    "AP604",
    "AR100",
    "AR120",
    "CT045",
    "CT100",
    "CT100R",
    "CT10N",
    "CT120",
    "CT12N",
    "CT27N",
    "CT30N",
    "CT35N",
    "CT50N",
    "CT7NX",
    "ISO7"
  ],
  "Ausa": [
    "25CM",
    "75",
    "80CMA",
    "MH08",
    "MH15",
    "MH25",
    "MH35",
    "MH35R",
    "MH55",
    "MH75"
  ],
  "Avant Tecno": [
    "Dumper 1200",
    "Dumper 1500"
  ],
  "Awasi": [
    "75-6"
  ],
  "BOART LONGYEAR": [
    "DeltaBase 420",
    "DeltaBase 430"
  ],
  "Babyack": [
    "Babyack 1",
    "Babyack 2"
  ],
  "Bandit": [
    "19XP",
    "3200"
  ],
  "Baraladi": [
    "EB40",
    "FB1.02",
    "FB1.2",
    "FB102",
    "FB102B",
    "FB102EB",
    "FB203",
    "Granello",
    "Minding"
  ],
  "Baratti": [
    "Scorpio"
  ],
  "Barreto": [
    "1324STK",
    "13STKH",
    "16STKB",
    "1824TK",
    "2024RTK",
    "2036RTK",
    "2324RTK"
  ],
  "Bastei": [
    "SLD151D"
  ],
  "Belle": [
    "5070"
  ],
  "Bellon Maria": [
    "Monkey"
  ],
  "Benassi": [
    "M350H",
    "M450H",
    "M550H"
  ],
  "Benati": [
    "M13",
    "M14",
    "M16"
  ],
  "Benfra": [
    "9.01",
    "9.01B",
    "9.02",
    "9.02B",
    "9.02S"
  ],
  "Bentrac": [
    "M16",
    "M25"
  ],
  "Beretta": [
    "GT15",
    "GT52",
    "Skorpio2C",
    "Spider",
    "T 41 (Drilling Machine)",
    "T21 (Drilling Machine)",
    "T25 (Drilling Machine)",
    "T41 (Drilling Machine)",
    "T43 (Drilling Machine)",
    "T43/2 (Drilling Machine)",
    "T44 (Drilling Machine)",
    "T45 (Drilling Machine)",
    "T46 (Drilling Machine)",
    "TD50",
    "TD75"
  ],
  "Bergmann": [
    "Dumper"
  ],
  "Bertani": [
    "C75"
  ],
  "Bertolini": [
    "Mini-excavator"
  ],
  "Betram": [
    "Crawler Crane"
  ],
  "Bitelli": [
    "BB611C(Asphalt Finisher)"
  ],
  "Bluelift": [
    "Aerial Platform"
  ],
  "Bobcat": [
    "220",
    "316",
    "319",
    "320 (562320000 and higher)",
    "320 (562320000 and lower)",
    "320 L",
    "321",
    "322",
    "322G",
    "323",
    "324",
    "325",
    "328",
    "328G",
    "329",
    "331",
    "331D",
    "331E",
    "331G",
    "334",
    "334D",
    "335",
    "337",
    "337G",
    "341",
    "341D",
    "341G",
    "418",
    "418A",
    "425",
    "428",
    "430D(Fast TRACK)",
    "430G",
    "430ZHS",
    "430ZTS",
    "435 (Fast TRACK)",
    "442",
    "444",
    "863(VTS System for Skidsteer Loader)",
    "864",
    "864H",
    "873",
    "883",
    "E08",
    "E10",
    "E10Z",
    "E10e",
    "E14",
    "E16",
    "E17",
    "E17Z",
    "E19",
    "E20",
    "E20Z",
    "E26",
    "E27",
    "E27z",
    "E32 [I guiding | M-series]",
    "E32 [J guiding | R-series]",
    "E32C",
    "E34",
    "E35 [I guiding | M-series]",
    "E35I [J guiding | R-series]",
    "E35M",
    "E35Z",
    "E41",
    "E42",
    "E45",
    "E50",
    "E55",
    "E60 [I guiding]",
    "E62",
    "E63",
    "E80",
    "E85",
    "MT 100",
    "MT100",
    "MT120",
    "MT50",
    "MT52",
    "MT55",
    "MT85",
    "S130",
    "S150",
    "S160",
    "S175",
    "S185",
    "S205",
    "S220",
    "S250",
    "S300",
    "T110",
    "T140",
    "T180",
    "T180H",
    "T190",
    "T190H",
    "T200",
    "T250",
    "T250H",
    "T300",
    "T300H",
    "T320",
    "T450",
    "T550",
    "T590",
    "T595",
    "T62",
    "T630",
    "T64",
    "T650",
    "T66",
    "T72",
    "T740",
    "T750",
    "T76",
    "T770",
    "T830",
    "T86",
    "T870",
    "X119",
    "X120",
    "X122",
    "X123",
    "X220",
    "X225",
    "X231",
    "X316",
    "X320",
    "X320 (SN<<2000)",
    "X320D",
    "X320E",
    "X322",
    "X322 (SN<<2000)",
    "X322D",
    "X322E",
    "X322G",
    "X323",
    "X324",
    "X325",
    "X328",
    "X328E",
    "X329",
    "X331",
    "X331E",
    "X334",
    "X334G",
    "X337",
    "X341",
    "X418",
    "X422",
    "X425",
    "X430",
    "X435",
    "X442",
    "X442B",
    "X442ZTS",
    "X444",
    "Y12",
    "ZX125",
    "ZX75"
  ],
  "Bonne Esperance": [
    "B23RP",
    "BE2050",
    "Minisand"
  ],
  "Bormor": [
    "200TX",
    "400TX"
  ],
  "Boxer": [
    "118",
    "320",
    "322D",
    "427",
    "526DX",
    "530DX",
    "532DX",
    "600HD",
    "700HDX",
    "Brute TRX",
    "TL 224"
  ],
  "Brokk": [
    "100",
    "110",
    "120D",
    "150",
    "160",
    "180",
    "180 <<2004",
    "180 >>2005",
    "260",
    "280",
    "300",
    "330",
    "40",
    "400",
    "50",
    "60",
    "90",
    "Aquacutter",
    "BM 110",
    "BM 150",
    "BM 150C",
    "BM 150P",
    "K330"
  ],
  "C & F": [
    "T 50",
    "T 85"
  ],
  "CARAVAGGI": [
    "Bio235"
  ],
  "CASE": [
    "15",
    "15 Maxi (rental)",
    "16",
    "16 Maxi",
    "16 RTN",
    "17 RTN Maxi",
    "1854C",
    "23",
    "23 Maxi",
    "28",
    "28 Maxi",
    "31",
    "31 Maxi",
    "35",
    "35 Maxi",
    "35 STB",
    "40XT",
    "410",
    "420",
    "420CT",
    "430",
    "435",
    "440",
    "440CT",
    "445",
    "445CT",
    "450",
    "450CT",
    "465",
    "50",
    "50 Maxi",
    "50 RTB",
    "6010 Turbo",
    "6030 Turbo",
    "6060 Turbo",
    "60XT",
    "70XT",
    "75XT",
    "85XT",
    "9007 Alliance",
    "90XT",
    "95XT",
    "CK08",
    "CK13",
    "CK15",
    "CK16",
    "CK23",
    "CK25",
    "CK28",
    "CK28 (1997)",
    "CK31",
    "CK32",
    "CK35",
    "CK36",
    "CK38",
    "CK50",
    "CK52",
    "CX 26C",
    "CX 27B",
    "CX 27BMC",
    "CX 27BMR",
    "CX 27BZTS",
    "CX 28",
    "CX 30B",
    "CX 30C",
    "CX 31",
    "CX 31B",
    "CX 31BMC",
    "CX 31BMR",
    "CX 33C",
    "CX 35",
    "CX 35B",
    "CX 36",
    "CX 36BMC[I guiding]",
    "CX 36BMC[J guiding]",
    "CX 36BMR[I guiding]",
    "CX 36BMR[J guiding]",
    "CX 36BZTS[I guiding]",
    "CX 36BZTS[J guiding]",
    "CX 36B[I guiding]",
    "CX 36B[J guiding]",
    "CX 37C",
    "CX 39B",
    "CX 40B",
    "CX 40BMC",
    "CX 40BMR",
    "CX 45B",
    "CX 47",
    "CX 50",
    "CX 50B",
    "CX 50BMC",
    "CX 50BMR",
    "CX 50BZTS",
    "CX 55B",
    "CX 57C",
    "CX 60C",
    "CX 75SR",
    "CX 80",
    "CX 80C",
    "CX 90D",
    "CX14",
    "CX14ZTS",
    "CX15",
    "CX15STC",
    "CX15STR",
    "CX16(2001)",
    "CX16B",
    "CX16SVC",
    "CX16SVR",
    "CX17BZTS",
    "CX17C",
    "CX18B",
    "CX18C",
    "CX20 BMR",
    "CX20B",
    "CX22 B",
    "CX22 BMC",
    "CX22 BZTS",
    "CX23",
    "CX25",
    "CX26 BZTS",
    "CX26B",
    "LX 92",
    "TF 300",
    "TF 300RT",
    "TR270",
    "TR310",
    "TR320",
    "TR340",
    "TV370",
    "TV370B",
    "TV380",
    "TV450B",
    "TV620B"
  ],
  "CAT": [
    "216",
    "226",
    "228",
    "232",
    "236",
    "239D",
    "239D3",
    "242",
    "246",
    "246C",
    "247",
    "247A",
    "247B",
    "247B2",
    "247B3",
    "248",
    "249D",
    "249D3",
    "256C",
    "257",
    "257A",
    "257B",
    "257B2",
    "257B3",
    "257D",
    "257D3",
    "259",
    "259B",
    "259B3",
    "259C",
    "259D",
    "259D3",
    "262C",
    "267",
    "267A",
    "267B",
    "267B2",
    "269C",
    "269D",
    "269D3",
    "272C",
    "277",
    "277A",
    "277B",
    "277C",
    "277C2",
    "277D",
    "279C",
    "279C2",
    "279D",
    "279D2",
    "279D3",
    "287",
    "287A",
    "287B",
    "287C",
    "287C2",
    "287D",
    "289C",
    "289C2",
    "289D",
    "289D2",
    "289D3",
    "297C",
    "297D",
    "297D2",
    "297D2 XHP",
    "297D2XHP",
    "299C",
    "299C2",
    "299D",
    "299D XHP",
    "299D2",
    "299D2 XHP",
    "299D2XHP",
    "299D3",
    "299D3XE",
    "300.9D",
    "301.4C",
    "301.5",
    "301.5CR",
    "301.6",
    "301.6C",
    "301.7CR",
    "301.7D",
    "301.7DCR",
    "301.8",
    "301.8C",
    "301.8CR",
    "302.2D",
    "302.5",
    "302.5C",
    "302.7DCR",
    "302CR",
    "303.5",
    "303.5CCR",
    "303.5DCR",
    "303.5E2CR",
    "303.5ECR",
    "303CCR",
    "303CR",
    "303CR 2007",
    "303ECR",
    "304.5",
    "304.5E2XTC",
    "304C",
    "304CCR",
    "304CR",
    "304DCR",
    "304E2CR",
    "304ECR",
    "305.5DCR",
    "305.5E2CR",
    "305.5ECR",
    "305CCR",
    "306CR",
    "307",
    "307A (Japan E70B)",
    "307B",
    "307C",
    "307CAC",
    "307CCC",
    "307CSB",
    "307HD",
    "307SSR",
    "308",
    "308BSR",
    "308CCR",
    "308CSR",
    "308DCRSB",
    "308E2CR",
    "308ECRSB",
    "311B",
    "311BSR",
    "311C Utility",
    "E110B",
    "E70",
    "E70B",
    "ME08",
    "ME08B",
    "ME15",
    "ME20",
    "ME25",
    "ME30",
    "ME30B",
    "ME30T",
    "ME35",
    "ME40",
    "ME40R",
    "ME45",
    "MH15",
    "MM08B",
    "MM15",
    "MM15-7",
    "MM15T",
    "MM20",
    "MM20CR (Corner Rad)",
    "MM20SR (short Rad)",
    "MM20T",
    "MM25",
    "MM25T",
    "MM30",
    "MM30B",
    "MM30CR",
    "MM30CR-2 (corner rad)",
    "MM30SR (short rad)",
    "MM30T",
    "MM35",
    "MM35B",
    "MM35T",
    "MM40B",
    "MM40CR",
    "MM40CR-2 (corner rad)",
    "MM40SR (short rad)",
    "MM40SR-2 (short rad)",
    "MM40T",
    "MM45",
    "MM45B",
    "MM45T",
    "MM55SR",
    "MM57SR (short rad)",
    "MMCR",
    "MS010",
    "MX35",
    "MX45"
  ],
  "CEASER": [
    "ES150-3",
    "ES180-3",
    "ES300",
    "ES400",
    "ES400ZT",
    "ES500",
    "ES800",
    "ES800TR"
  ],
  "CELA": [
    "Spider 120",
    "Spider 260",
    "Spider 560",
    "TELJ28"
  ],
  "CFC": [
    "BabyTapiro",
    "MaxiSpeed",
    "Speed 1800",
    "SpeedTapiro Old",
    "SpeedTaripo Carro Standard",
    "SpeedTaripo Carro Standard 2",
    "SpeedTaripo NuovoCarro2013"
  ],
  "CMC": [
    "S15",
    "S19",
    "S24"
  ],
  "CME": [
    "M12",
    "M15"
  ],
  "Cameca": [
    "Baby"
  ],
  "Camisa": [
    "280",
    "380",
    "480H",
    "580",
    "680",
    "TR635"
  ],
  "Cams Libra": [
    "214",
    "216S",
    "218SV",
    "219RSV",
    "224S",
    "229S",
    "234S",
    "254ST",
    "865",
    "CZ25",
    "CZ30",
    "CZ37",
    "CZ50",
    "CZ54",
    "CZ55",
    "T865",
    "T985"
  ],
  "Carlton": [
    "SP5014TRX",
    "SP7015TRX",
    "SP8018TRX<2009"
  ],
  "Carmix": [
    "K413",
    "K414",
    "K415"
  ],
  "Carrier": [
    "1200",
    "1700X"
  ],
  "Casorzo": [
    "MTR450",
    "MTR600"
  ],
  "Celli": [
    "ECOSTAR-SC600"
  ],
  "Chieftan": [
    "10",
    "10F",
    "10G",
    "10S",
    "12",
    "12G",
    "IS7FX"
  ],
  "Chikusui/Canycom": [
    "BFG1005(Mini Transporter)",
    "BFG1301",
    "BFG1301 (Mini Transporter)",
    "BFG1302 (Mini Transporter)",
    "BFG1303 (Mini Transporter)",
    "BFK703 (Mini Transporter)",
    "BFK709 (Mini Transporter)",
    "BFK808 (Mini Transporter)",
    "BFP402",
    "BFP402 (Mini Transporter)",
    "BFP405",
    "BFP405 (Mini Transporter)",
    "BFP501",
    "BFP602",
    "BFP602 (Mini Transporter)",
    "BFP703 (Mini Transporter)",
    "BFS901G (Mini Transporter)",
    "BFS901Q (Mini Transporter)",
    "BFX703(Mini Transporter)",
    "BFY901 (Mini Transporter)",
    "CC1000 (Mini Transporter)",
    "CC1300 (Mini Transporter)",
    "CC1500 (Mini Transporter)",
    "CC300 (Mini Transporter)",
    "CC316 (Mini Transporter)",
    "CC350 (Mini Transporter)",
    "CC450 (Mini Transporter)",
    "CC500 (Mini Transporter)",
    "CC600 (Mini Transporter)",
    "CC700 (Mini Transporter)",
    "CC800 (Mini Transporter)",
    "D50",
    "DF 407",
    "GC 403 (Mini Transporter)",
    "GC 41 (Mini Transporter)",
    "GC 42 (Mini Transporter)",
    "GC 50 (Mini Transporter)",
    "GC 640 (Mini Transporter)",
    "GG 403(Mini Transporter)",
    "HUKI 130 (Mini Transporter)",
    "HUKI 150 (Mini Transporter)",
    "S100",
    "SC75"
  ],
  "Collina": [
    "320L Tractor",
    "Junior 200",
    "S100",
    "SC",
    "Sardegna"
  ],
  "Coltrax": [
    "CX60",
    "CX85S",
    "MXC550"
  ],
  "Comacchio": [
    "GEO205 (Drilling Machine)",
    "GEO305 (Drilling Machine)"
  ],
  "Comeca": [
    "Bamby8"
  ],
  "Comet": [
    "MT 13 (Mini Transporter)",
    "MT 13AB (Mini Transporter)",
    "MT 13BB (Mini Transporter)"
  ],
  "Commander": [
    "C4200",
    "H15"
  ],
  "Comoter": [
    "C15",
    "C18"
  ],
  "Compair Holman": [
    "MTRAX"
  ],
  "Conjet": [
    "ROBOT322"
  ],
  "Cormidi": [
    "10.65 (Mini Transporter)",
    "10.65 auto (Mini Transporter)",
    "13.80 (Mini Transporter)",
    "13.80 auto (Mini Transporter)",
    "14.100 (Mini Transporter)",
    "14.65 (Mini Transporter)",
    "14.90 (Mini Transporter)",
    "18.100 (Mini Transporter)",
    "18.100 Dtae (Mini Transporter)",
    "20.150 (Mini Transporter)",
    "23.150 Auto (Mini Transporter)",
    "23.150 Dtae (Mini Transporter)",
    "23.150 Dum (Mini Transporter)",
    "23.150 Ext (Mini Transporter)",
    "34.200 Auto (Mini Transporter)",
    "34.200 Dum (Mini Transporter)",
    "5.65 (Mini Transporter)",
    "50 (Mini Transporter)",
    "56 (Mini Transporter)",
    "6.50 RI (Mini Transporter)",
    "6.65 (Mini Transporter)",
    "65 (Mini Transporter)",
    "9.65 (Mini Transporter)",
    "9.65 Auto (Mini Transporter)",
    "9.65 R (Mini Transporter)",
    "C10-80 ACW",
    "C100",
    "C145",
    "C1500",
    "C20.150 (Mini Transporter)",
    "C85"
  ],
  "DLGZ": [
    "DL15-9"
  ],
  "Daewoo": [
    "450 Plus",
    "460 Plus",
    "AH30",
    "DH30",
    "DH35",
    "DH50",
    "SL035",
    "Solar007",
    "Solar010",
    "Solar015",
    "Solar015Plus",
    "Solar018",
    "Solar018VT",
    "Solar030",
    "Solar030Plus",
    "Solar035",
    "Solar035Plus",
    "Solar10",
    "Solar15",
    "Solar25",
    "Solar30",
    "Solar35",
    "Solar55",
    "Solar55-3",
    "Solar55-5",
    "Solar55-V",
    "Solar55-VPlus",
    "Solar55Exv",
    "Solar70-III",
    "Solar75V"
  ],
  "Dimex": [
    "DBM0511"
  ],
  "Dino": [
    "185XTC"
  ],
  "Ditch-Witch": [
    "AT 40",
    "HT 25",
    "HT 25K",
    "HT 25K (2000 Model)",
    "HT 25K (2001 Model)",
    "JT 10",
    "JT 1200",
    "JT 2320",
    "JT 2321",
    "JT 25",
    "JT 2511",
    "JT 2520",
    "JT 2720 (2000)",
    "JT 2720 (2003)",
    "JT 30",
    "JT 3020",
    "JT 3020 Mach 1",
    "JT 3510",
    "JT 40",
    "JT 4020",
    "JT 4020 (Drilling Machine)",
    "JT 4020 Mach 1",
    "JT 5",
    "JT 520",
    "JT 820",
    "JT 860",
    "JT 9 (Drilling Machine)",
    "JT 920 (Drilling Machine)",
    "JT 920L (Drilling Machine)",
    "JT 922",
    "MX 15",
    "MX 182",
    "MX 202",
    "MX 27",
    "MX 27-2",
    "MX 35",
    "MX 352",
    "MX 45",
    "MX 45 CA",
    "MX 502",
    "MX9",
    "SK 300",
    "SK 350",
    "SK 600",
    "XT 850",
    "XT 855"
  ],
  "Dodich": [
    "DM2.1"
  ],
  "Domine": [
    "FUTURO (Drilling Machine)"
  ],
  "Doosan": [
    "DX80",
    "DX80R",
    "DX85R",
    "Dx10z",
    "Dx19",
    "Dx27",
    "Dx27Z",
    "Dx30",
    "Dx30Z",
    "Dx35",
    "Dx35Z",
    "Dx35Z-7",
    "Dx50Z-7",
    "Dx55",
    "Dx60",
    "Dx60R",
    "Dx62R",
    "Dx63R"
  ],
  "Drago": [
    "SWISS"
  ],
  "Dumec": [
    "D 800",
    "D 800B",
    "D 800F",
    "D 800P",
    "Transporter"
  ],
  "Durso": [
    "10.65 Auto",
    "10.65 Dumper",
    "13.80 Auto",
    "13.80 Dumper",
    "14.100 Auto",
    "14.100 Dumper",
    "18.100 Auto",
    "18.100 DTR",
    "18.100 Dumper",
    "6.50 RI",
    "6.50 RM",
    "9.65 Auto",
    "9.65 Dumper"
  ],
  "Dynapac": [
    "FC 15",
    "VC 15",
    "VD 15",
    "VD 151",
    "VD 152",
    "VD 251",
    "VD 351"
  ],
  "EFCO": [
    "TN500R"
  ],
  "EMCI": [
    "700"
  ],
  "Eckart": [
    "1B30",
    "EMB 450B"
  ],
  "Ecofore": [
    "CE 302G",
    "CE 403G"
  ],
  "Electro Joe": [
    "Ecojolly"
  ],
  "Energreen": [
    "Robogreen"
  ],
  "Enteco": [
    "E4"
  ],
  "Erreppi": [
    "Carry500"
  ],
  "EuroCAT": [
    "140HVS",
    "150LSE",
    "350LSE"
  ],
  "EuroTrac": [
    "Comet MT13",
    "Comet MT13BB",
    "chasis M 13 (Undercarriage)",
    "chasis T150 (Undercarriage)",
    "chasis T150 Old",
    "chasis T300 (Undercarriage)",
    "chasis T300 Old (Undercarriage)",
    "chasis T4  (Undercarriage)",
    "chasis T4 Old  (Undercarriage)",
    "chasis T500  (Undercarriage)",
    "chasis T500 Old (Undercarriage)"
  ],
  "EurocoMach": [
    "100TR",
    "22SR",
    "42ZT",
    "45TR",
    "90ZT",
    "E 1300 (01208 &gt; SN &gt; 01201)",
    "E 1300 (SN &gt; 01208 & SN &lt; 01201)",
    "E 1500 (OLD)",
    "E 1500S",
    "E 1500Sb",
    "E 4000",
    "E 800",
    "E1200",
    "EB 09.5 Dumper",
    "ES  150SR",
    "ES 150",
    "ES 150-1",
    "ES 150-2",
    "ES 150-3",
    "ES 180",
    "ES 180-1",
    "ES 180-2",
    "ES 180-3",
    "ES 180-4",
    "ES 180SR",
    "ES 180ZT",
    "ES 18ZT",
    "ES 25ZT",
    "ES 300",
    "ES 300 ZT",
    "ES 35.2ZT",
    "ES 350ZT",
    "ES 40.2ZT",
    "ES 400",
    "ES 400SR",
    "ES 40ZT",
    "ES 500",
    "ES 500ZT",
    "ES 57ZT",
    "ES 60ZT",
    "ES 65TR",
    "ES 80",
    "ES 800",
    "ES 800TR",
    "ES 85",
    "ES 850ZT",
    "ES 90",
    "ES 90UR",
    "ES 90ZT",
    "ES 95TR",
    "Es 10ZT"
  ],
  "Eurodig": [
    "C 15 (Minilift)",
    "C 18 (Minilift)",
    "Dumpy 300",
    "Dumpy 300M",
    "Dumpy 500(Type 1)",
    "Dumpy 500(Type 2)",
    "Dumpy 800(Type 1)",
    "Dumpy 800(Type 2)",
    "Dumpy 800(Type 3)",
    "G 500",
    "GR 1000",
    "GR 500",
    "GR 500D",
    "GR 700",
    "GR 700A",
    "GR 700A3",
    "GR 700D",
    "GR 900",
    "Miniload 800"
  ],
  "Eurofor": [
    "GEO205 (Drilling Machine)"
  ],
  "Eurotom": [
    "NB 30",
    "TS 08",
    "TS 15",
    "TS 15S",
    "TS 17SE",
    "TS 25",
    "TS 27S",
    "TS 30",
    "TS 30R",
    "TS 35",
    "TS 35S",
    "TS 75",
    "TS 75S"
  ],
  "FAI": [
    "212 New",
    "212 Old",
    "215",
    "218",
    "230",
    "235",
    "240",
    "410C"
  ],
  "FIGO": [
    "MC 150 (Mini Dumper)"
  ],
  "FORT": [
    "Minidumper"
  ],
  "Falcon Spider": [
    "FS290C"
  ],
  "Fercad": [
    "T 3250"
  ],
  "Fermec": [
    "114",
    "115",
    "123",
    "125",
    "128",
    "130",
    "131",
    "135",
    "145",
    "150",
    "SK 015",
    "SK 025",
    "SK 030",
    "SK 035"
  ],
  "Fiat-Hitachi": [
    "FH 15",
    "FH 15.2",
    "FH 15.2 Plus",
    "FH 16.2",
    "FH 17.2",
    "FH 17.2 Plus",
    "FH 17.2-B",
    "FH 22",
    "FH 22.2",
    "FH 30.2",
    "FH 30.2 Plus",
    "FH 35.2",
    "FH 35.2 Plus",
    "FH 40.2",
    "FH 40.2 Plus"
  ],
  "Fiori": [
    "800",
    "Dumpy Proffesional",
    "Eurodig 1000",
    "GR 1000",
    "GR 500",
    "GR 700",
    "Minding"
  ],
  "Foredil": [
    "FM 16",
    "FM 18V",
    "FM 19RSV",
    "FM 19VR",
    "FM 24",
    "FM 29",
    "FM 34",
    "FM 54"
  ],
  "Forti": [
    "Forti"
  ],
  "Fraste": [
    "Multidrill ML (drilling machine)",
    "Multidrill PL (drilling machine)",
    "Multidrill XL (drilling machine)",
    "Terrain (drilling machine)"
  ],
  "Gayk": [
    "HRE1000",
    "HRE3000"
  ],
  "Geawelltech": [
    "Well drill 3050CR"
  ],
  "Gehl": [
    "12002",
    "153",
    "193",
    "223",
    "253",
    "303",
    "353",
    "363",
    "373",
    "383Z",
    "502",
    "503",
    "503Z",
    "603",
    "753",
    "753Z",
    "75Z3",
    "8003",
    "802",
    "803",
    "GE 12002",
    "GE 142 (US Market)",
    "GE 152 (US Market)",
    "GE 153",
    "GE 192 (US Market)",
    "GE 193",
    "GE 222 (US Market)",
    "GE 223",
    "GE 253",
    "GE 272 (US Market)",
    "GE 292 (US Market)",
    "GE 303",
    "GE 342 (US Market)",
    "GE 353",
    "GE 362 (US Market)",
    "GE 373",
    "GE 502 (US Market)",
    "GE 602 (US Market)",
    "GE 802 (US Market)",
    "GE503Z",
    "Z35",
    "Z45",
    "Z80"
  ],
  "Gehlmax": [
    "A 12",
    "A 12B",
    "A 14SA",
    "DR 600",
    "GX 10",
    "GX 35",
    "M 045",
    "M 135",
    "M 135S",
    "MB 045",
    "MB 1135",
    "MB 1135S",
    "MB 138",
    "MB 145",
    "MB 148",
    "MB 165",
    "MB 253",
    "MB 288",
    "MB 358",
    "RD 10 (Mini Dumper)",
    "RD 10 SLE (Mini Dumper)",
    "RD 15D (Mini Dumper)",
    "RD 15DR (Mini Dumper)",
    "RD 6HX (Mini Dumper)",
    "RD 7",
    "RD 7-10D (Mini Dumper)",
    "RD 7SLE (Mini Dumper)",
    "RD 8 (Mini Dumper)",
    "RD 8HX (Mini Dumper)",
    "RD 8SLE (Mini Dumper)"
  ],
  "Geier": [
    "40S",
    "60S",
    "85TLY"
  ],
  "Gelai & Castegnaro": [
    "G&C"
  ],
  "Genie": [
    "S-60 Trax (Quad)",
    "S-65 Trax (Quad) 400 Wide",
    "S-65 Trax (Quad) 450 Wide"
  ],
  "Geoprobe": [
    "54DT (Drilling Machine)",
    "6610DT (Drilling Machine)",
    "7822DT (Drilling Machine)"
  ],
  "Goman": [
    "T30",
    "X08",
    "X16"
  ],
  "Green Mech": [
    "ST19-28",
    "ST220"
  ],
  "Green Technik": [
    "BC350"
  ],
  "Grillo": [
    "Dumper 350 Basic",
    "Dumper 350 HD",
    "Dumper 507"
  ],
  "Grundohit": [
    "4S",
    "TT",
    "Undercarriage 40"
  ],
  "HCC": [
    "1050-B (Mini-Carrier)",
    "1051 (Mini-Carrier)",
    "1051-B (Mini-Carrier)",
    "1051-D (Mini-Carrier)"
  ],
  "HOEFLON": [
    "C6 (Spider Crane)"
  ],
  "Hades": [
    "TP 1500"
  ],
  "Haihong": [
    "CTX8008"
  ],
  "Hainzl": [
    "150LSE"
  ],
  "Hanix": [
    "H 08",
    "H 08-1",
    "H 08-2",
    "H 08A",
    "H 08B",
    "H 09D",
    "H 12A",
    "H 15",
    "H 15 B",
    "H 15 B-2",
    "H 15 Bplus",
    "H 15 Bplus-2",
    "H 151",
    "H 15A (<1996)",
    "H 15A (>1996)",
    "H 22",
    "H 22A",
    "H 24",
    "H 24A",
    "H 26B",
    "H 26C",
    "H 27",
    "H 27-2",
    "H 29A",
    "H 30",
    "H 30-2",
    "H 30A",
    "H 35",
    "H 35A",
    "H 36A",
    "H 36B",
    "H 36C",
    "H 36CR",
    "H 36R",
    "H 50B",
    "H 50C",
    "H 55DR",
    "H 56C",
    "H 75B",
    "H 75C",
    "H 80",
    "H 80-2",
    "N 050",
    "N 06",
    "N 060",
    "N 080",
    "N 080-1",
    "N 080-2",
    "N 080-2LR",
    "N 080-3LR",
    "N 120",
    "N 120-2",
    "N 120R",
    "N 150",
    "N 150-2",
    "N 150R",
    "N 220-2",
    "N 230-2",
    "N 250-2",
    "N 260-2",
    "N 300-2",
    "N 35",
    "N 350-2",
    "N 80",
    "N 80-2",
    "N 80-2R",
    "NH 070",
    "NS 25",
    "RT 30 (Dumper)",
    "RT 50D (Dumper)",
    "S&B15",
    "S&B15R",
    "S&B15S",
    "S&B15SR",
    "S&B25-1",
    "S&B25-2",
    "S&B300",
    "S&B300-2",
    "S&BX-1",
    "TP50-D",
    "YB 10",
    "YFW 5D-1"
  ],
  "Hansa": [
    "C65RX"
  ],
  "Hanta": [
    "SLD 151D"
  ],
  "Haulotte": [
    "Mygalift19 (Lifting Platform)"
  ],
  "Hematec": [
    "CTE CS 135 (Crane)",
    "CTE CS 170 (Sky Lifter)"
  ],
  "Hengte": [
    "HT20"
  ],
  "Hiab": [
    "033T"
  ],
  "Hinowa": [
    "DB 10.13",
    "DB 14.7",
    "DB 8.35",
    "DB 9.11",
    "DM 09",
    "DM 10",
    "DM 10A 2V",
    "DM 10M",
    "DM 11KA",
    "DM 13",
    "DM 13A 2V",
    "DM 15",
    "DM 15M",
    "DM 15S",
    "DM 20",
    "DM 20S",
    "DM 30",
    "DM 30C",
    "DM 30S",
    "DM 40",
    "DM 40L",
    "DM 40L2V",
    "DM 8",
    "DM 8A",
    "DM 8M",
    "Dumpy (minidumper)",
    "GL 1255 (Lifting Platform)",
    "GL 1470 (Lifting Platform)",
    "Gold lift 12.55 (Lifting Platform)",
    "Gold lift 14.70 (Lifting Platform)",
    "Gold lift 17.80XL (Lifting Platform)",
    "HP 1000 (Mini Dumper)",
    "HP 1000E (Mini Dumper)",
    "HP 1100 (Mini Dumper)",
    "HP 1100A (Mini Dumper)",
    "HP 1100D (Mini Dumper)",
    "HP 1150 (Mini Dumper)",
    "HP 1200 (Mini Dumper)",
    "HP 1200E",
    "HP 1500 (Mini Dumper)",
    "HP 1500/2",
    "HP 800 (Mini-Excavator)",
    "HP 800A (Mini Dumper)",
    "HP 800E (Mini Dumper)",
    "HP 850B/A",
    "HR 15.1",
    "HS 1100",
    "HS 1150",
    "HS 1200E",
    "HS 701",
    "HS 850",
    "LL 14.72 (Lifter)",
    "LL 15.70 (Lifter)",
    "LL 19.65 (Lifter)",
    "LL 23.12 (Lifter)",
    "LL 33.17 (Lifter)",
    "PT 10 (Undercarriage)",
    "PT 100 (Undercarriage)",
    "PT 10G (Undercarriage)",
    "PT 10G/300 (Undercarriage)",
    "PT 30G (Undercarriage)",
    "PT 30G/200 (Undercarriage)",
    "PT 35GL (undercarriage)",
    "PT 35GL/300 (undercarriage)",
    "PT 4000 (undercarriage)",
    "PT 4000G/100 (undercarriage)",
    "PT 70 (undercarriage)",
    "PT 70G/100 (undercarriage)",
    "PT 70GL (undercarriage)",
    "PT 8 (undercarriage)",
    "PT 8G/300 (undercarriage)",
    "PT 9 (undercarriage)",
    "PT 9C (undercarriage)",
    "PT13 (Undercarriage)",
    "PT13/300 (Undercarriage)",
    "PT15 (Undercarriage)",
    "PT150 (Undercarriage)",
    "PT15G (Undercarriage)",
    "PT15G/400 (Undercarriage)",
    "PT15G/4001 (Undercarriage)",
    "PT1700 (Undercarriage)",
    "PT20 (Undercarriage)",
    "PT2000 (Undercarriage)",
    "PT2000G/100 (Undercarriage)",
    "PT200P (Undercarriage)",
    "PT20G (Undercarriage)",
    "PT20G/301 (Undercarriage)",
    "PT20G/3011 (Undercarriage)",
    "PT20GL (Undercarriage)",
    "PT20GL/301 (Undercarriage)",
    "PT3000 (Undercarriage)",
    "PT3000G/100 (Undercarriage)",
    "TT 1350",
    "TT 1600",
    "TT 1700",
    "VT 1550",
    "VT 1550 2V",
    "VT 1650",
    "VT 1650 2V",
    "VT 2000",
    "VT 2500",
    "VT 3000",
    "VT 3000 2V",
    "VT 4000",
    "VT 4000 2V",
    "VTT 1300",
    "VTT 1550",
    "VTT 1650",
    "YB 10",
    "YFW 5D-1"
  ],
  "Hitachi": [
    "16",
    "18",
    "25",
    "30",
    "30U",
    "35",
    "35U",
    "40",
    "40U",
    "50",
    "50U",
    "50U-2",
    "55U",
    "70",
    "80",
    "85",
    "AX16-2N (2002)",
    "CG 100 (Dumper)",
    "CG 110 (Dumper)",
    "CG 65 (Dumper)",
    "EX 08",
    "EX 100",
    "EX 100-1",
    "EX 100-2",
    "EX 100-3",
    "EX 100-5",
    "EX 105",
    "EX 10U",
    "EX 10UX",
    "EX 12 (New)",
    "EX 12 (old)",
    "EX 12-1",
    "EX 12-2",
    "EX 120 (not on new sprocket)",
    "EX 120-2",
    "EX 120-5",
    "EX 135U",
    "EX 135UR",
    "EX 135VR",
    "EX 138UU",
    "EX 14",
    "EX 14SR",
    "EX 15",
    "EX 15 (Lotus root)",
    "EX 15-1",
    "EX 15-2",
    "EX 15SR",
    "EX 15U",
    "EX 15UR",
    "EX 16",
    "EX 16-2",
    "EX 17",
    "EX 17-2",
    "EX 17-2B",
    "EX 17U",
    "EX 20-2",
    "EX 20U",
    "EX 20U-1",
    "EX 20U-3",
    "EX 20UR",
    "EX 20UR-1",
    "EX 20UR-3",
    "EX 21",
    "EX 22",
    "EX 22-1",
    "EX 22-2",
    "EX 24",
    "EX 24U",
    "EX 25",
    "EX 25-1",
    "EX 25-2",
    "EX 25U",
    "EX 26",
    "EX 27",
    "EX 27U",
    "EX 29U",
    "EX 29UR",
    "EX 30",
    "EX 30-1",
    "EX 30-2",
    "EX 30U Lotus root",
    "EX 30UR",
    "EX 30UR-1",
    "EX 30UR-2",
    "EX 30UR-3",
    "EX 32U",
    "EX 33",
    "EX 33Mu",
    "EX 33U",
    "EX 33U-3",
    "EX 35",
    "EX 35-1",
    "EX 35-2",
    "EX 35U",
    "EX 36U",
    "EX 40",
    "EX 40-2",
    "EX 40U",
    "EX 40UR",
    "EX 40UR-1",
    "EX 40UR-2",
    "EX 40URG",
    "EX 45",
    "EX 45-2",
    "EX 50",
    "EX 50-1",
    "EX 50-2",
    "EX 50U",
    "EX 50UR",
    "EX 50UR-2",
    "EX 50URG",
    "EX 55",
    "EX 55UR",
    "EX 55UR-2",
    "EX 55UR-3",
    "EX 55URG",
    "EX 58",
    "EX 58Mu",
    "EX 60 LC",
    "EX 60 LC-2",
    "EX 60 LC-3",
    "EX 60 LC-5",
    "EX 60 URG-2",
    "EX 7",
    "EX 70U",
    "EX 75-2",
    "EX 75UR",
    "EX 75UR-2",
    "EX 75UR-3 (SN < 1530)",
    "EX 75UR-3 (SN > 1529)",
    "EX 75UR-5",
    "EX 75US",
    "EX 75US-7 ('2001)",
    "EX 8",
    "EX 8-1",
    "EX 8-2",
    "EX 8-2B",
    "EX 80U",
    "Ex 18-2",
    "HE 10",
    "HE 15",
    "HX 140B (Crane) (OEM400x72.5x72)",
    "HX 64B (Lifting platform)",
    "HX 99B (Crane)",
    "HX 99B (Lifting platform)",
    "HX 99B-2 (Lifting platform)",
    "ME 15",
    "ME 15S",
    "SH 15-2",
    "SH 30-2",
    "SH 40-2",
    "SH 45-2",
    "UE 004",
    "UE 10",
    "UE 12",
    "UE 15",
    "UE 15SR",
    "UE 20",
    "UE 30 (OEM 300x52.5x84)",
    "UE 35",
    "UE 40",
    "UE 45",
    "UE 50",
    "ZE 19",
    "ZX 10U",
    "ZX 10U-2",
    "ZX 135",
    "ZX 14-3",
    "ZX 16",
    "ZX 16-3",
    "ZX 16YLR",
    "ZX 17U-2",
    "ZX 17U-2YLR",
    "ZX 17U-5",
    "ZX 17U-6",
    "ZX 18",
    "ZX 18-3",
    "ZX 19U-5",
    "ZX 19U-6",
    "ZX 22U",
    "ZX 22U-2",
    "ZX 25",
    "ZX 25CLR",
    "ZX 26U-5",
    "ZX 27U",
    "ZX 27U-2",
    "ZX 27U-3",
    "ZX 29U",
    "ZX 29U-3",
    "ZX 30",
    "ZX 30U",
    "ZX 30U-2",
    "ZX 30U-3F",
    "ZX 33U",
    "ZX 33U-3",
    "ZX 33U-5",
    "ZX 35",
    "ZX 35U-2",
    "ZX 35U-3",
    "ZX 35U-5",
    "ZX 38U",
    "ZX 38U-3",
    "ZX 38U-5",
    "ZX 40",
    "ZX 40U",
    "ZX 40U-2",
    "ZX 40U-3",
    "ZX 48 U-3",
    "ZX 48 U-5",
    "ZX 50",
    "ZX 50U (SN < 7001 )",
    "ZX 50U (SN > 7000 )",
    "ZX 50U-2",
    "ZX 50U-3",
    "ZX 50U-5",
    "ZX 52U",
    "ZX 52U-3",
    "ZX 55U",
    "ZX 55U-5",
    "ZX 55U-6",
    "ZX 60U-3",
    "ZX 60U-5",
    "ZX 60USB",
    "ZX 60USB-3",
    "ZX 60USB-5N",
    "ZX 65U-5",
    "ZX 65USB-6",
    "ZX 70LC",
    "ZX 75US",
    "ZX 8-2",
    "ZX 80LC",
    "ZX 85",
    "ZX 85US",
    "ZX 85US-3",
    "ZX 85US-5A"
  ],
  "Hokuetsu": [
    "HM 07S",
    "HM 10",
    "HM 10G",
    "HM 10SG",
    "HM 15",
    "HM 15S",
    "HM 30SZG",
    "HM 45"
  ],
  "Holmac": [
    "HM 200",
    "HZC 16-22",
    "HZC 24",
    "HZC 25",
    "HZC 26-20",
    "HZC 26TL (Long side)",
    "HZC 26TL (Short side)",
    "HZC 29 2X",
    "HZC 35",
    "HZC 35T",
    "HZC 37"
  ],
  "Holman": [
    "R 13700"
  ],
  "Holmed": [
    "Mini-excavator"
  ],
  "Honda": [
    "B 114",
    "B 415",
    "HP 250 (carrier) [OEM 180x60x30]",
    "HP 350 (carrier) [OEM 180x60x34]",
    "HP 400 (carrier) [OEM 180x60x37]",
    "HP 500 (carrier) [OEM 180x60x37]",
    "HP 510 (carrier)",
    "HP 515 (carrier)",
    "HP 516 (carrier)",
    "HP 800A (mini dumper)",
    "SC 156DD (Carrier)",
    "SC 433 (Carrier)"
  ],
  "Huki": [
    "110 (Dumper)",
    "120H (Dumper)",
    "130 (Dumper)",
    "150 (Dumper)",
    "150R (Dumper)",
    "150S (Dumper)",
    "700-2 (Dumper)",
    "80 (Dumper)",
    "D 50"
  ],
  "Husqvarna": [
    "DXR 140",
    "DXR 270",
    "DXR 300",
    "DXR 310",
    "DXR250"
  ],
  "Hutte": [
    "HBR 202TF"
  ],
  "Hutter": [
    "14 G2"
  ],
  "Hydra": [
    "9 / 2 (Sky lifter)",
    "JOY 1 (Drilling machine)",
    "JOY 2 (Drilling machine)"
  ],
  "Hydramac": [
    "H 15",
    "H 20"
  ],
  "Hydro Rain": [
    "EUROPA H20"
  ],
  "Hyundai": [
    "HX10A",
    "R 35 Z-9",
    "Robex 15-5",
    "Robex 15-7",
    "Robex 16-7",
    "Robex 16-9",
    "Robex 17z-9a",
    "Robex 18-9",
    "Robex 25z-9ak",
    "Robex 27Z-9",
    "Robex 28-5",
    "Robex 30",
    "Robex 30z-9a",
    "Robex 30z-9ak",
    "Robex 35-9",
    "Robex 35Z-7A",
    "Robex 35z-9a",
    "Robex 35z-9ak",
    "Robex 36-7",
    "Robex 55-3",
    "Robex 55-7",
    "Robex 55-9",
    "Robex 55-9a",
    "Robex 60cr-9a",
    "Robex 75-7",
    "Robex 80CR-9",
    "Robex R60 CR-9"
  ],
  "ICE(Internationalstruction Equipment INC": [
    "TD 308 (>2004 model)"
  ],
  "IHI": [
    "102 (dumper) ('2002)",
    "102R (dumper) ('2002)",
    "103 (dumper) ('2002)",
    "103E (dumper) ('2002)",
    "107 (Carrier)",
    "10Z",
    "12J",
    "12JX",
    "12NX",
    "12VXE",
    "14NXT",
    "15J",
    "15NX",
    "16N",
    "16NXT",
    "17J",
    "17NE('2002)",
    "17VXE",
    "18J",
    "18N",
    "18NXT",
    "19VXT",
    "20JX",
    "20NX",
    "20NX-2",
    "20Z",
    "22UX",
    "25J",
    "25JX",
    "25NX",
    "25VX",
    "27V4",
    "28J",
    "28N",
    "28N-2",
    "28N-3",
    "28UX",
    "30J",
    "30JX",
    "30NX",
    "30NX-2",
    "30UJ",
    "30UX",
    "30V4",
    "30VX",
    "30Z",
    "32J",
    "35FX",
    "35J",
    "35JX",
    "35N",
    "35NX",
    "35NX-2",
    "35UJ",
    "35VX",
    "38N",
    "38UJ",
    "40G-1",
    "40GX-2",
    "40J",
    "40JX",
    "40NX",
    "40Z",
    "45J",
    "45J-2",
    "45N",
    "45NX",
    "45UJ",
    "45UJ-2",
    "45V4",
    "50J",
    "50NX",
    "50UX",
    "50VX",
    "50Z",
    "55J",
    "55J-2",
    "55N",
    "55UJ",
    "55UX",
    "55V4",
    "55VX",
    "55VX-3",
    "60V4",
    "65NX",
    "65UJ",
    "65UX",
    "65VX",
    "65VX-2",
    "70Z",
    "75NX",
    "75UJ",
    "7GX",
    "7J",
    "7JE",
    "80NX",
    "80NX-3",
    "80VX",
    "80VX-3",
    "85V-4",
    "9NX",
    "9VX",
    "CARRY 105",
    "CARRY 107",
    "CARRY 110",
    "CCH 30T(Minicare)",
    "CCH 30T(pick ace crane)",
    "IM R15",
    "IS 07",
    "IS 10",
    "IS 10C",
    "IS 10F",
    "IS 10FX",
    "IS 10G",
    "IS 10GX",
    "IS 10S",
    "IS 10Z",
    "IS 11X",
    "IS 12",
    "IS 12C",
    "IS 12G",
    "IS 12GX",
    "IS 12JX",
    "IS 12NX",
    "IS 12S",
    "IS 14",
    "IS 14G",
    "IS 14GX",
    "IS 14GX-2",
    "IS 14GX-3",
    "IS 14PX",
    "IS 15J",
    "IS 17J",
    "IS 17JE",
    "IS 18J",
    "IS 18UJ",
    "IS 20JX",
    "IS 20LX",
    "IS 22UX",
    "IS 25G",
    "IS 25GX",
    "IS 25J",
    "IS 25JX",
    "IS 25NX",
    "IS 27",
    "IS 27G",
    "IS 27GX",
    "IS 28",
    "IS 28G",
    "IS 28G3",
    "IS 28GX",
    "IS 28J",
    "IS 28JX",
    "IS 28LX",
    "IS 28PX",
    "IS 28UX",
    "IS 28UX-2",
    "IS 30G",
    "IS 30GX",
    "IS 30GX-2",
    "IS 30GX-3",
    "IS 30J",
    "IS 30JX",
    "IS 30NX",
    "IS 30NX-2",
    "IS 30UJ",
    "IS 30UJ-2",
    "IS 30Z",
    "IS 32J",
    "IS 35G",
    "IS 35G-1",
    "IS 35G-2",
    "IS 35GX",
    "IS 35GX-1",
    "IS 35GX-2",
    "IS 35GX-3",
    "IS 35J",
    "IS 35JX",
    "IS 35NX",
    "IS 35UJ",
    "IS 38UJ",
    "IS 38UX",
    "IS 40J",
    "IS 40JX",
    "IS 40NX",
    "IS 40UJ",
    "IS 40Z",
    "IS 45J",
    "IS 45NX",
    "IS 45UJ",
    "IS 50G",
    "IS 50G3",
    "IS 50GX",
    "IS 50UJ",
    "IS 50UX",
    "IS 50Z",
    "IS 55",
    "IS 55G",
    "IS 55G-3",
    "IS 55J",
    "IS 55LX",
    "IS 55N",
    "IS 55U-1",
    "IS 55U-2",
    "IS 55UJ",
    "IS 55UX",
    "IS 65UJ",
    "IS 65UJ3",
    "IS 70Z",
    "IS 75F",
    "IS 75F UJ",
    "IS 7FX",
    "IS 7GX",
    "IS 7GX-2",
    "IS 7GX-3",
    "IS 7J",
    "IS 7P",
    "IS 80NX",
    "IS9UX-2 (S/N > 1592000)",
    "IS9UX-3",
    "MC 15",
    "T 840"
  ],
  "INOVA": [
    "INOVA"
  ],
  "Imai": [
    "SPD 265C",
    "SPD 360C"
  ],
  "Imef": [
    "HE 1.15",
    "HE 12",
    "HE 14",
    "HE 14S",
    "HE 16",
    "HE 16S",
    "HE 18",
    "HE 185",
    "HE 18S",
    "HE 230",
    "HE 31",
    "HE 32",
    "HT 6.01 (Carrier)"
  ],
  "Imer": [
    "CC 1500",
    "CC 450",
    "CC 600",
    "CC 800",
    "IM R19"
  ],
  "Italmec": [
    "Platform"
  ],
  "JCB": [
    "100C-1",
    "16C-1",
    "18Z-1",
    "19C-1",
    "35Z-1",
    "45Z-1",
    "48Z-1",
    "51R-1",
    "55Z-1",
    "57C-1",
    "65R",
    "67C",
    "8008 'Micro 800'",
    "8008CTS",
    "801 (S/N<649729)",
    "801 (S/N>649730)",
    "801,2ZTS",
    "801,7 (S/N > 649730)",
    "801.4",
    "801.5",
    "801.6",
    "801.8",
    "8010 'Micro 1000'",
    "8012 'Micro 1000'",
    "8013",
    "8014",
    "8014 ('05/2005 - SN: 1156000)",
    "8014 CTS",
    "8014 Super",
    "8015",
    "8015-2",
    "8016",
    "8016 ('05/2005 - SN: 1155000 - 115 5334)",
    "8016 Super",
    "8017",
    "8018",
    "8018 CTS",
    "8018 Super",
    "8018 TG",
    "8018 ZTS",
    "8018X ('05/2005 - SN 1046000)",
    "801FDI",
    "801R (models &gt; 02/'93)",
    "801R (models &lt; 02/'93)",
    "802",
    "802 Plus",
    "802 Super",
    "802,7 ZTS",
    "802.4",
    "802.7",
    "802.7 Plus",
    "8020",
    "8020CTS",
    "8025ZTS",
    "8025ZTS(Long)",
    "8026",
    "8026CTS",
    "8027Z('2002)",
    "8027ZTS",
    "8029CTS",
    "803",
    "803 Magnum",
    "803 Plus",
    "803 Super",
    "803,2ZTS",
    "8030ZTS",
    "8032Z('2002)",
    "8032ZTS",
    "8035Z",
    "803E",
    "804",
    "804 Plus",
    "804 Super",
    "8040ZTS",
    "8045ZTS",
    "805",
    "805.2",
    "8050ZTS",
    "8052",
    "8055RTS",
    "8055Z",
    "8055ZTS",
    "8056",
    "806",
    "8060",
    "8065RTS",
    "8080ZTS",
    "8085ZTS",
    "85Z-1",
    "86C-1",
    "90Z-1",
    "Dumpster",
    "JS 70",
    "JZ 70",
    "MTl 200",
    "Micro",
    "Micro 8008",
    "Micro Light",
    "Micro Plus",
    "TD 10(Dumper)",
    "TD 10SL(Dumper)",
    "TD 7(Dumper)"
  ],
  "JIEHE": [
    "JHZA-25"
  ],
  "JLG": [
    "X14J",
    "X14JH",
    "X17J",
    "X19J",
    "X23J",
    "X33JPlus",
    "X390AJ",
    "X550AJ",
    "X700AJ"
  ],
  "Jekko": [
    "JF40",
    "SPX424CDH",
    "SPX527CDH"
  ],
  "John Deere": [
    "120 (US Market)",
    "120C (US Market)",
    "15",
    "17 ZTS (US Market)",
    "17D",
    "17G",
    "240",
    "250",
    "260",
    "26D",
    "26G",
    "27 ZTS (US Market)",
    "270",
    "27C ZTS (US Market)",
    "27D",
    "280",
    "30G",
    "317",
    "317G",
    "320",
    "325",
    "325G",
    "328",
    "332",
    "35 ZTS (US Market)",
    "35C ZTS (US Market)",
    "35D",
    "35G",
    "50 ZTS (US Market)",
    "50C ZTS (US Market)",
    "50D",
    "50G (Verify Spocket Width)",
    "60D",
    "60G [I Guiding]",
    "60G [J Guiding]",
    "75C",
    "75D",
    "75G",
    "85D",
    "85G",
    "8875",
    "CT 319 D",
    "CT 319 E",
    "CT 322",
    "CT 323D",
    "CT 323E",
    "CT329D",
    "CT329E",
    "CT331G",
    "CT332",
    "CT333D",
    "CT333E",
    "CT333G"
  ],
  "Joly": [
    "20HP (Minicarrier)"
  ],
  "Kaidi": [
    "103",
    "103.3",
    "WY 1.5"
  ],
  "Kato": [
    "70",
    "85V-4",
    "HD 09VX3",
    "HD 140",
    "HD 205UR",
    "HD 250UR",
    "HD 307('2001)",
    "HD 308",
    "HD 50UR",
    "HD 510",
    "HD 55UR"
  ],
  "Kato-Imer": [
    "19VXT",
    "HD27V4",
    "HD27V5",
    "HD30V5",
    "HD35",
    "HD45V5"
  ],
  "Kawasaki": [
    "KE 60",
    "Mini-carrier"
  ],
  "Kobelco": [
    "115",
    "B 53",
    "B 61",
    "B 69",
    "FC 50",
    "SK 002",
    "SK 005",
    "SK 007",
    "SK 007-1",
    "SK 007-2",
    "SK 007-3",
    "SK 008",
    "SK 009",
    "SK 013",
    "SK 013-1",
    "SK 014(New)",
    "SK 014(Old)",
    "SK 020",
    "SK 020 Coupe",
    "SK 025 Coupe",
    "SK 030 Coupe",
    "SK 035 Coupe",
    "SK 045 Coupe",
    "SK 35SR",
    "SK 35SR-2",
    "SK 35SR-2E",
    "SK 35SR-3",
    "SK 35SR-5",
    "SK 35SR-6",
    "SL 16MST",
    "SS 60",
    "SS1",
    "Sk 014-1",
    "Sk 015",
    "Sk 015-1",
    "Sk 024",
    "Sk 024-1",
    "Sk 025",
    "Sk 025-1",
    "Sk 025-2",
    "Sk 025SR",
    "Sk 027",
    "Sk 027-1",
    "Sk 030",
    "Sk 030-1",
    "Sk 030-2",
    "Sk 030SR",
    "Sk 030UR",
    "Sk 030UR-1",
    "Sk 030UR-2",
    "Sk 031",
    "Sk 032",
    "Sk 035",
    "Sk 035-1",
    "Sk 035-2",
    "Sk 035SR",
    "Sk 042",
    "Sk 042-1",
    "Sk 045",
    "Sk 045-1",
    "Sk 045-2",
    "Sk 050",
    "Sk 050-1",
    "Sk 060",
    "Sk 13SR",
    "Sk 15MSR",
    "Sk 15R",
    "Sk 15SR",
    "Sk 16MSR ('2001)",
    "Sk 17",
    "Sk 17 SR 3",
    "Sk 17 SR 5",
    "Sk 20SR",
    "Sk 20SR-3",
    "Sk 20UR ('2000)",
    "Sk 25SR",
    "Sk 25SR-2",
    "Sk 25SR-6",
    "Sk 27",
    "Sk 27SR-3",
    "Sk 27SR-5",
    "Sk 28SR-6",
    "Sk 30SR",
    "Sk 30SR-1",
    "Sk 30SR-2 ('2001)",
    "Sk 30SR-3",
    "Sk 30SR-5",
    "Sk 30SR-6",
    "Sk 30UR",
    "Sk 30UR-1",
    "Sk 30UR-2",
    "Sk 40SR ('96-'06)",
    "Sk 40SR-ZT",
    "Sk 40SR3 ('96-'06)",
    "Sk 45",
    "Sk 45-1",
    "Sk 45SR",
    "Sk 45SR-2",
    "Sk 50",
    "Sk 50-1",
    "Sk 50SR",
    "Sk 50SR-3",
    "Sk 50UR",
    "Sk 50UR-1",
    "Sk 50UR-2",
    "Sk 55SRX",
    "Sk 55SRX 6E",
    "Sk 60",
    "Sk 60-1",
    "Sk 60-2",
    "Sk 60-3 (untill'97)",
    "Sk 60UR",
    "Sk 70SR",
    "Sk 70SR-1E",
    "Sk 70SR-2",
    "Sk 75-3",
    "Sk 75SR",
    "Sk 75UR",
    "Sk 75UR-1",
    "Sk 80CS",
    "Sk 80MSR",
    "Sk 85CS",
    "Sk 85MSR",
    "Sk 95UR",
    "Sk25SR-3",
    "Sk25SR-5",
    "Z11 (Crawler Crane)",
    "Z13 (Crawler Crane)",
    "Z14 (Crawler Crane)",
    "Z15 (Crawler Crane)",
    "Z16 (Crawler Crane)"
  ],
  "Komatsu": [
    "1020 Turbo",
    "820 Turbo",
    "CK 1122",
    "CK 1122-5",
    "CK 16",
    "CK 20",
    "CK 20-1",
    "CK 25",
    "CK 25-1",
    "CK 30",
    "CK 30-1",
    "CK 35",
    "CK 35-1",
    "D27R-8",
    "PC 03",
    "PC 03 avance",
    "PC 03-1 (SN>1001)",
    "PC 03-2",
    "PC 03-2 avance (SN>15001)",
    "PC 05",
    "PC 05 avance R (8000<Sn&lt; 10619)",
    "PC 05 avance R (SN>10616)",
    "PC 05-1(SN>1001)",
    "PC 05-2",
    "PC 05-5(SN>2501)",
    "PC 05-6(SN<5001)",
    "PC 05-6(SN>5001)",
    "PC 05-7",
    "PC 05-8",
    "PC 05-R(S/N 8001-10618)",
    "PC 05-R(SN>10618)",
    "PC 07",
    "PC 07 avance R (S/N 3001-5460)",
    "PC 07-1(S/N>1001)",
    "PC 07-2",
    "PC 07-2E(SN F11149)",
    "PC 07-6",
    "PC 07-7",
    "PC 07FR-1",
    "PC 07R",
    "PC 08",
    "PC 08 avance (SN>1000)",
    "PC 08U",
    "PC 08UU",
    "PC 08UU-1",
    "PC 09",
    "PC 09-1 (2006)",
    "PC 09FR",
    "PC 09FR-1",
    "PC 10-6 (SN>20001)",
    "PC 10FR",
    "PC 10MR",
    "PC 10MR-1 avance (SN>30001)",
    "PC 10UU",
    "PC 10UU-3 avance (SN>10001)",
    "PC 20 MR ('2006)",
    "PC 20-2",
    "PC 20-6",
    "PC 20-7 (S/N < F20419)",
    "PC 20-7 (S/N > F20419)",
    "PC 20FR-1",
    "PC 20FR-2",
    "PC 20MR-1 avance (SN > 10001)",
    "PC 20MRX",
    "PC 20MRX Utility",
    "PC 20R",
    "PC 20R Utility",
    "PC 20R-8 (SN > 10000) [OEM 260x52.5x76]",
    "PC 20R-8 [OEM 260x109x37]",
    "PC 20UU",
    "PC 20UU-3 avance (SN > 10001)",
    "PC 22MR-3",
    "PC 24MR-5",
    "PC 25",
    "PC 25 avance R (1001 < SN &lt; 6470)",
    "PC 25 avance R (SN > 6471)",
    "PC 25-1 (SN > 6470)",
    "PC 25-2",
    "PC 25-7",
    "PC 25E-1 (SN > 6470)",
    "PC 25R",
    "PC 25R-8",
    "PC 26MR",
    "PC 26MR-5",
    "PC 27",
    "PC 27MR",
    "PC 27MR-1 avance (SN > 10001)",
    "PC 27MR-2",
    "PC 27MR-3",
    "PC 27MRX",
    "PC 27R",
    "PC 27R Utility",
    "PC 27R-8",
    "PC 27R-8E Deluxe",
    "PC 28",
    "PC 28 UU-3 avance (SN > 30001)",
    "PC 28-1 (S/N > 2358)",
    "PC 28-2",
    "PC 28-2 avance (7001 < SN &lt; 10800)",
    "PC 28-2 avance (SN > 10801)",
    "PC 28R",
    "PC 28uu",
    "PC 28uu-1",
    "PC 28uu-2",
    "PC 28uu-3",
    "PC 30",
    "PC 30 avance R",
    "PC 30 avance R (SN > 26423)",
    "PC 30-5",
    "PC 30-6",
    "PC 30-7 (S/N < F18384)",
    "PC 30-7 (S/N > F18384)",
    "PC 30-7E",
    "PC 30-8",
    "PC 30FR-1",
    "PC 30FR-2",
    "PC 30MR",
    "PC 30MR-1",
    "PC 30MR-1 (> 05/04 mfg)",
    "PC 30MR-2",
    "PC 30MR-3",
    "PC 30MRX",
    "PC 30R",
    "PC 30R-8",
    "PC 30R-8 avance (SN > 10001)",
    "PC 30uu-2",
    "PC 30uu-3",
    "PC 35",
    "PC 35-8",
    "PC 35MR",
    "PC 35MR-1",
    "PC 35MR-1 (> 05/04 mfg)",
    "PC 35MR-2",
    "PC 35MR-3",
    "PC 35MR-5",
    "PC 35MRX",
    "PC 35R",
    "PC 35R Utility",
    "PC 35R-8 Deluxe",
    "PC 35R-8 [OEM 300x109x41]",
    "PC 35R-8 [OEM 300x55x82]",
    "PC 35R-8 avance (SN > 35001)",
    "PC 38",
    "PC 38-2",
    "PC 38-2 avance R",
    "PC 38uu-2",
    "PC 38uu-2 avance (3001 < SN &lt; 4482)",
    "PC 38uu-2 avance (SN > 4483)",
    "PC 38uu-3",
    "PC 38uuM-2",
    "PC 38uuM-2 avance (SN > 1001)",
    "PC 40 avance R (> 24521)",
    "PC 40-7 (SN > 24521)",
    "PC 40FR-2 ('Victas assymetric')",
    "PC 40MR",
    "PC 40MR-1 (SN > 1001)",
    "PC 40MR-2",
    "PC 40MRX",
    "PC 40R (S/N > 24522)",
    "PC 40R-8",
    "PC 40R-8 avance (SN > 30001)",
    "PC 40T",
    "PC 45",
    "PC 45 avance R (S/N > 3505)",
    "PC 45-1 (F1492)",
    "PC 45-1E",
    "PC 45-8",
    "PC 45MR",
    "PC 45MR-1",
    "PC 45MR-3",
    "PC 45MR-5",
    "PC 45MRX",
    "PC 45R (> 3506)",
    "PC 45R Utility",
    "PC 45R-8",
    "PC 45R-8 avance (SN > 5001)",
    "PC 50-2 (> 12772)",
    "PC 50-2 avance R (S/N > 12771)",
    "PC 50-3",
    "PC 50FR-1",
    "PC 50FR-2 (Victas assymetric)",
    "PC 50M-2",
    "PC 50MR",
    "PC 50MR-1 (>05/04 mfg)",
    "PC 50MR-2 ('2006)",
    "PC 50UD UG-2 (SN > 12750)",
    "PC 50uu-2 (New)",
    "PC 50uu-2 avance (SN > 12772)",
    "PC 50uu-2E (SN > 12760)",
    "PC 50uuM-2",
    "PC 50uuM-2 avance (SN > 10001)",
    "PC 55MR",
    "PC 55MR-3",
    "PC 58SF-1 (SN > 1001)",
    "PC 58uu-3",
    "PC 58uu-X",
    "PC 60-6 (type 2)",
    "PC 60-6 (type 3)",
    "PC 75",
    "PC 75-1 (S/N 1175 - 5001)",
    "PC 75-2 (S/N 5001 - 7927)",
    "PC 75-2 (S/N > 7928)",
    "PC 75R-2",
    "PC 75R-8",
    "PC 75uu-1 (SN > 1175)",
    "PC 75uu-2 (SN > 7927)",
    "PC 75uu-2A",
    "PC 75uu-2AR",
    "PC 75uu-2DQ",
    "PC 75uu-2R",
    "PC 75uu-3",
    "PC 75uu-3A",
    "PC 75uu-3T",
    "PC 75uuT-6",
    "PC 78MR-6 (verify links! May be 74 link count)",
    "PC 78N",
    "PC 80MR",
    "PC 80MR-5",
    "PC 88MR",
    "PC 88MR-10",
    "PC 88MR-6",
    "PC 88MR-8",
    "PC 95",
    "PC 95-1",
    "PC 95R-2",
    "PC12R-8",
    "PC12R-8 Mistral HS",
    "PC12R-8 avance",
    "PC14R HS",
    "PC14R-2",
    "PC14R-2 HS",
    "PC14R-3",
    "PC14R-3 HS",
    "PC15",
    "PC15 FR-1",
    "PC15 MR",
    "PC15 MR-1",
    "PC15 MRX",
    "PC15 MRX-1",
    "PC15 P",
    "PC15 R",
    "PC15 R HS",
    "PC15 R Mistral",
    "PC15 R-8E Deluxe",
    "PC15 avance R(5001<SN&lt;6221)",
    "PC15 avance R(SN>6222)",
    "PC15-1 (SN>1001)",
    "PC15-2 (Not on new rollers)",
    "PC15-2 (SN>2001)",
    "PC15-3",
    "PC15-6",
    "PC15-6 (Not on new rollers)",
    "PC15-7",
    "PC16 R HS",
    "PC16 R-2",
    "PC16 R-2HS",
    "PC16 R-3",
    "PC16R-3HS",
    "PC18MR('2006)",
    "PC18MR-2('2006)",
    "PC18MR-3",
    "PC18MR-5",
    "PC20",
    "PC20 MR-2",
    "PC20 avance R (35001<SN&lt;42354)",
    "PC20 avance R (SN>42355)",
    "PC20(F10038)",
    "PC20-8",
    "PC75R",
    "SK1020 (VTS System for Skidsteer Loader)",
    "SK815 (VTS System for Skidsteer Loader)",
    "SK818 (VTS System for Skidsteer Loader)",
    "SK820 (VTS System for Skidsteer Loader)"
  ],
  "Kubota": [
    "AR 30",
    "D902",
    "FH 007",
    "HG",
    "K 007",
    "K 008",
    "K 008-2",
    "K 008-3",
    "K 008-3G",
    "K 008DH",
    "K 013",
    "K 015",
    "K 020",
    "K 022",
    "K 025",
    "K 028",
    "K 030",
    "K 030 (Lotus root)",
    "K 030-3",
    "K 035",
    "K 035-3",
    "K 038",
    "K 040",
    "K 045",
    "K 080",
    "K 151",
    "KC 110H (dumper)",
    "KC 110HR (dumper)",
    "KC 110HR-4 (dumper)",
    "KC 120 (dumper)",
    "KC 121 (dumper)",
    "KC 140",
    "KC 40 (dumper)",
    "KC 50 (dumper) [OEM 200x72x34]",
    "KC 50 new (dumper) [OEM 250x72x46]",
    "KC 50LZ (dumper)",
    "KC 51",
    "KC 70 (dumper)",
    "KH 007",
    "KH 008",
    "KH 012 (new)",
    "KH 012 (old)",
    "KH 012G",
    "KH 012HG",
    "KH 014",
    "KH 014G",
    "KH 014HG",
    "KH 02",
    "KH 021",
    "KH 021HG",
    "KH 024",
    "KH 026",
    "KH 026G",
    "KH 027",
    "KH 027G",
    "KH 02HG",
    "KH 030",
    "KH 030G",
    "KH 030HG",
    "KH 033 [OEM 300x109x39]",
    "KH 033HG [OEM 300x109x39]",
    "KH 040",
    "KH 041",
    "KH 045",
    "KH 05",
    "KH 055",
    "KH 055N",
    "KH 060",
    "KH 07",
    "KH 090",
    "KH 101",
    "KH 12",
    "KH 120",
    "KH 121",
    "KH 130",
    "KH 14",
    "KH 14G",
    "KH 14HG",
    "KH 151",
    "KH 191 [OEM 450x71x78]",
    "KH 21",
    "KH 24",
    "KH 24HG",
    "KH 26HG",
    "KH 26SR [OEM 320x100x40]",
    "KH 28",
    "KH 30SR [OEM 320x100x40]",
    "KH 30SRG [OEM 320x100x40]",
    "KH 31",
    "KH 35",
    "KH 36",
    "KH 37",
    "KH 38",
    "KH 41 [OEM 230x72x42]",
    "KH 41R",
    "KH 5",
    "KH 50 [OEM 230x72x42]",
    "KH 50SR [OEM 420x100x52]",
    "KH 51",
    "KH 51SR [OEM 420x100x52]",
    "KH 52",
    "KH 52SR [OEM 400x146x36]",
    "KH 55 [OEM 230x72x42]",
    "KH 55G",
    "KH 55R",
    "KH 55S",
    "KH 55X",
    "KH 5HC",
    "KH 60 [OEM 300x109x35]",
    "KH 61",
    "KH 65",
    "KH 66 [OEM 300x109x35]",
    "KH 70 [OEM 300x109x37]",
    "KH 71 [OEM 300x109x35]",
    "KH 90",
    "KH 91",
    "KN 36",
    "KN 51",
    "KX 007",
    "KX 008",
    "KX 012",
    "KX 014",
    "KX 015-4",
    "KX 016-4",
    "KX 018-4",
    "KX 019-4",
    "KX 021 [OEM 250x109x35]",
    "KX 021UR",
    "KX 024",
    "KX 026",
    "KX 027",
    "KX 027-4",
    "KX 030 [OEM 300x109x39]",
    "KX 030-4",
    "KX 033 [OEM 300x109x39]",
    "KX 033-4",
    "KX 037-4",
    "KX 040",
    "KX 040-4",
    "KX 040-4HGA",
    "KX 041",
    "KX 042-4",
    "KX 045",
    "KX 057-4",
    "KX 057-5",
    "KX 060-5",
    "KX 080",
    "KX 080-3",
    "KX 080-4",
    "KX 100-5",
    "KX 101",
    "KX 101-3",
    "KX 101-3&2",
    "KX 101-3&3",
    "KX 101-3&4",
    "KX 12",
    "KX 120-5",
    "KX 121-2",
    "KX 121-2S",
    "KX 121-3",
    "KX 121-3&",
    "KX 151",
    "KX 161-2",
    "KX 161-2S",
    "KX 161-2SR",
    "KX 161-3",
    "KX 161-3&",
    "KX 161-3CX",
    "KX 21",
    "KX 251",
    "KX 251N2PG",
    "KX 28",
    "KX 36",
    "KX 36-2",
    "KX 36-3",
    "KX 36-3GL",
    "KX 36-3HGL",
    "KX 36HG",
    "KX 41",
    "KX 41-2",
    "KX 41-2S",
    "KX 41-2SC",
    "KX 41-2SV",
    "KX 41-2V",
    "KX 41-2VC",
    "KX 41-3 [S/N < 20972]",
    "KX 41-3 [S/N > 30001]",
    "KX 41-3S",
    "KX 41-3SGL",
    "KX 41-3V(2009)",
    "KX 41-3V(2010 & UP)",
    "KX 41-3VGL",
    "KX 41HG",
    "KX 41L",
    "KX 51",
    "KX 61",
    "KX 61-2",
    "KX 61-2&",
    "KX 61-2S",
    "KX 61-3",
    "KX 71",
    "KX 71-2",
    "KX 71-2&",
    "KX 71-3",
    "KX 71-3GL",
    "KX 75UR",
    "KX 80",
    "KX 90",
    "KX 91-2",
    "KX 91-2S",
    "KX 91-2SR",
    "KX 91-3",
    "KX 91-3&",
    "KX 91-3&-2",
    "KXB 300",
    "RX 141",
    "RX 201",
    "RX 202",
    "RX 301",
    "RX 301UR",
    "RX 302",
    "RX 303",
    "RX 501",
    "RX 502",
    "RX 502VA",
    "SVL 65-2 (Compact Track Loader)",
    "SVL 75 (Compact Track Loader)",
    "SVL 75-2 (Compact Track Loader)",
    "SVL 75-3 (Compact Track Loader)",
    "SVL 90 (Compact Track Loader)",
    "SVL 90-2 (Compact Track Loader)",
    "SVL 95 (Compact Track Loader)",
    "SVL 95-2 (Compact Track Loader)",
    "SVL 95-2s (Compact Track Loader)",
    "SVL 97-2 (Compact Track Loader)",
    "U-008",
    "U-10",
    "U-10-3",
    "U-10-5",
    "U-15",
    "U-15 Lotus root",
    "U-15-3",
    "U-17",
    "U-17-3",
    "U-17-3&",
    "U-20",
    "U-20 (Korean model)",
    "U-20-3",
    "U-20-3&",
    "U-20-3V",
    "U-20-3VHG",
    "U-25-3",
    "U-25-3G",
    "U-25-3GL",
    "U-27-4",
    "U-30",
    "U-30-1",
    "U-30-2",
    "U-30-3",
    "U-30-5S",
    "U-30-6S",
    "U-30HG",
    "U-35",
    "U-35&",
    "U-35-3",
    "U-35-3&",
    "U-35-3&2",
    "U-35-3G",
    "U-35-3GAI",
    "U-35-3HG",
    "U-35-4",
    "U-35HG",
    "U-35SS (Super Series)",
    "U-36-4",
    "U-40",
    "U-45",
    "U-45-3",
    "U-45G",
    "U-45VA",
    "U-48-4",
    "U-50-3",
    "U-50-5",
    "U-55",
    "U-55-4",
    "U-55-4 S",
    "U-55-5",
    "U-56-5",
    "UX 30"
  ],
  "Link-Belt": [
    "LS 1600C",
    "Quantum 1600"
  ],
  "MBU": [
    "D 400",
    "D 500"
  ],
  "Macanizacion Y Mineria Sa": [
    "MYMC",
    "MYMP6"
  ],
  "Macmoter": [
    "L 6C",
    "M 1",
    "M 1 Miniropa",
    "M 1 S",
    "M 2",
    "MB 135S"
  ],
  "Madro": [
    "OMH-400",
    "SMH-400"
  ],
  "Maeda": [
    "M-104C",
    "MC104C",
    "MC104CR",
    "MC174"
  ],
  "Manitou": [
    "1.16S",
    "1650RT",
    "1850RT",
    "2100RT",
    "2150RT",
    "3200VT",
    "RT105",
    "RT135"
  ],
  "Massey Ferguson": [
    "MF 114",
    "MF 115",
    "MF 123",
    "MF 125",
    "MF 128",
    "MF 130",
    "MF 131",
    "MF 135",
    "MF 145",
    "MF 150"
  ],
  "Maweco": [
    "1003",
    "1302",
    "403",
    "703",
    "TC 10",
    "YB 10"
  ],
  "Maxima": [
    "TB 15"
  ],
  "Mc Connel": [
    "Robocut"
  ],
  "Mc Elory": [
    "TracStar 28",
    "TracStar 412",
    "TracStar 500",
    "TracStar 618",
    "TracStar 900"
  ],
  "Mecalac": [
    "10 MCR",
    "6 MCR",
    "8MCR ('2010)"
  ],
  "Mecanica Benassi": [
    "MB 300",
    "MB 350",
    "MB 500"
  ],
  "Mecbo": [
    "P2800-BR.8"
  ],
  "Meinl": [
    "Hamster"
  ],
  "Menzi Muck": [
    "C14",
    "C19"
  ],
  "Merlo": [
    "M4-2",
    "M4-3 Turbo",
    "M6 ('2002)",
    "M8",
    "M8-2 Plus Dumper",
    "M8-2 Plus Mixer"
  ],
  "Mertz": [
    "PX 10",
    "PX 17"
  ],
  "Messersi": [
    "CH1",
    "CH2",
    "CH2/N13D",
    "CH2/R13",
    "CH2R Carrier",
    "CH2R Mixer",
    "CH3",
    "CM 1",
    "M 08",
    "M 08E",
    "M 10E",
    "M 13",
    "M 15",
    "M 16",
    "M 16BV",
    "M 16U",
    "M 18",
    "M 18BE",
    "M 18BE/C",
    "M 20",
    "M 22U",
    "M 25",
    "M 28",
    "M 28P",
    "M 30",
    "M 32",
    "M 35",
    "M 35P/C",
    "M 50",
    "M 50P",
    "TCH 05",
    "TCH 07D",
    "TCH 09",
    "TCH 10D",
    "TCH 12",
    "TCH 13",
    "TCH 15",
    "TCH 1500",
    "TCH 15S",
    "TCH R16D"
  ],
  "Mini Mustang": [
    "MM18"
  ],
  "Minicarrier": [
    "TL 10",
    "YB 10",
    "YEW 5D1",
    "YFW 5"
  ],
  "Minidig": [
    "G 500",
    "GR 700A",
    "GR 900"
  ],
  "Mintrac": [
    "1003",
    "1302",
    "403",
    "703",
    "709",
    "808"
  ],
  "Mira": [
    "HD 190-1"
  ],
  "Mitsubishi": [
    "ME 15",
    "ME 30",
    "MM 20",
    "MM 25",
    "MM 30CR",
    "MM 35",
    "MM 35A",
    "MM 35B",
    "MM 35T",
    "MM 40",
    "MM 40SR",
    "MM 45B",
    "MM 55SR",
    "MS 010",
    "MX 35",
    "MX 45"
  ],
  "Monitor": [
    "1275",
    "43T"
  ],
  "Mopas": [
    "ME35"
  ],
  "Morath": [
    "BR 1800"
  ],
  "Morooka": [
    "CG 65",
    "MST 1500",
    "MST 1500-P",
    "MST 1500E",
    "MST 1500V",
    "MST 1500VD",
    "MST 1700",
    "MST 1900",
    "MST 2200",
    "MST 2200V",
    "MST 2200VD",
    "MST 2300",
    "MST 600V",
    "MST 600VD",
    "Track Carrier 1500",
    "Track Carrier 2200"
  ],
  "Multidrill": [
    "ML (HD Drilling Machine)",
    "PL (HD Drilling Machine)",
    "SL (HD Drilling Machine)",
    "XL (HD Drilling Machine)"
  ],
  "Multitel": [
    "SMX250.E"
  ],
  "Mustang": [
    "1000M",
    "1650 RT",
    "170Z",
    "1750 RT",
    "1850 RT",
    "2040",
    "2042",
    "2044",
    "2050",
    "2054",
    "2060",
    "2066",
    "2070",
    "2076",
    "2086",
    "2095",
    "2099",
    "2100RT",
    "2105",
    "2109",
    "2500RT",
    "250Z",
    "3200VT",
    "350ZNXT2",
    "3803ZT",
    "450ZNXT2",
    "5003Z",
    "5003ZT",
    "7503",
    "7503ZT",
    "ME 1402",
    "ME 1502",
    "ME 1503",
    "ME 1902",
    "ME 1903",
    "ME 2202",
    "ME 2203",
    "ME 2503",
    "ME 2702",
    "ME 2902",
    "ME 3003",
    "ME 3402",
    "ME 3503",
    "ME 3602",
    "ME 3703",
    "ME 5002",
    "ME 5003",
    "ME 6002",
    "ME 6003",
    "ME 6502",
    "ME 8002",
    "MTL 16",
    "MTL 20",
    "MTL 25",
    "MTL 312",
    "MTL 316",
    "MTL 320",
    "MTL 325",
    "RD 15"
  ],
  "Nagano": [
    "NB 30",
    "NS 08-2",
    "NS 15",
    "NS 15-2",
    "NS 15-3",
    "NS 16-3",
    "NS 25",
    "NS 30",
    "NS 35",
    "NS 35-2",
    "NS 35-2A",
    "NS 35-2B",
    "NS 75-2"
  ],
  "Nagano Highland": [
    "NB 30",
    "NS 15-2",
    "NS 45-2"
  ],
  "Nante": [
    "NT 110",
    "NT 12",
    "NT 15",
    "NT 16",
    "NT 18",
    "NT 18D",
    "NT 30U"
  ],
  "Navago": [
    "19/9 ('2001)"
  ],
  "Navigator": [
    "D7x11a"
  ],
  "Nemag": [
    "Mini-excavator"
  ],
  "Nemek": [
    "407 RT",
    "407 TS"
  ],
  "New Holland": [
    "C 175",
    "C 180",
    "C 185",
    "C 190",
    "C 227",
    "C 232",
    "C 234",
    "C 237",
    "C 238",
    "C 245",
    "C 327",
    "C 332",
    "C 334",
    "C 337",
    "C 345",
    "E 115",
    "E 16",
    "E 17",
    "E 17C",
    "E 18",
    "E 18C",
    "E 18SR",
    "E 20.2SR",
    "E 20SR",
    "E 22.2SR",
    "E 25SR",
    "E 26BSR",
    "E 26C",
    "E 27.2SR",
    "E 29 BSR",
    "E 30.2SR",
    "E 30C",
    "E 30SR",
    "E 33C",
    "E 35.2C",
    "E 35.2SR",
    "E 35BSR",
    "E 35SR",
    "E 37C",
    "E 39BSR",
    "E 40.2SR",
    "E 40SR",
    "E 45.2SR",
    "E 45SR",
    "E 50.2SR",
    "E 50B",
    "E 55BX",
    "E 70BSR",
    "E 70SR",
    "E 75CSR",
    "E 80",
    "E 80BMSR",
    "E 80CS",
    "E 80MSR",
    "EC 15",
    "EC 25",
    "EC 25SR",
    "EC 35SR",
    "EC 45",
    "EC 45SR",
    "EC 60",
    "EH 15B",
    "EH 16",
    "EH 18",
    "EH 25",
    "EH 27B",
    "EH 30B",
    "EH 35",
    "EH 35B",
    "EH 45",
    "EH 50B",
    "EH 80",
    "LS 160",
    "LS 170",
    "LS 180",
    "LS 185 B",
    "LS 190",
    "LT 175B",
    "LT 185B",
    "LT 190B",
    "LX 865",
    "LX 885",
    "LX 985"
  ],
  "Nibbi": [
    "NTR 270",
    "NTR 350",
    "NTR 450",
    "NTR 500",
    "NTR 500D"
  ],
  "Nifty": [
    "TD 120TN",
    "TD 34T"
  ],
  "Nihon Flex": [
    "Snow Plow"
  ],
  "Nihon Freki": [
    "Snow showel"
  ],
  "Niko": [
    "HRS 70",
    "HY 13/11",
    "HY 20/11 70cm",
    "HY 20/11 70cm SOM",
    "HY 27/16",
    "HY 27/16 85cm",
    "HY 30/16",
    "HY 38/16 70cm Poclain",
    "HY 38/16 90cm",
    "HY 38/16A",
    "HY 48/58 2000",
    "HY 610",
    "HY 710"
  ],
  "Nissan": [
    "150/N",
    "N 050",
    "N 06",
    "N 060",
    "N 080",
    "N 080 3LR",
    "N 080-2",
    "N 080-2LR",
    "N 120",
    "N 120-2",
    "N 120R",
    "N 150",
    "N 150-2",
    "N 150-2R",
    "N 150R",
    "N 220-2",
    "N 230-2",
    "N 230-2R",
    "N 250-2",
    "N 260-2",
    "N 260-2R",
    "N 300-2",
    "N 300-2R",
    "N 35",
    "N 350-2",
    "N 350-2R",
    "N 80",
    "N 80-2",
    "N 80-2R",
    "S&B 08",
    "S&B 25-1",
    "S&B 25-2",
    "S&B 300",
    "S&B 300-2",
    "S&B X 1",
    "X 1"
  ],
  "Pagani Geotechnical Equipment": [
    "TG 63/100",
    "TG 63/150",
    "TG73/200"
  ],
  "Palazzani": [
    "TSJ 12",
    "TSJ 22/24",
    "TSJ 23",
    "TSJ 24",
    "TSJ 24 (2nd type - lifting platform)",
    "TSJ 34 (Lifting platform)",
    "TSJ 43 (Lifting platform)",
    "TZ 170 (Lifting platform)",
    "XTJ 30/C (Lifting platform)",
    "XTJ 48"
  ],
  "Paus-Hermann": [
    "MB 1.6",
    "MB 2.0",
    "MB 2.4 ('1994)",
    "MB 3.2"
  ],
  "Pauselli": [
    "500",
    "700"
  ],
  "Pazzaglia": [
    "FZ 100 (Tree remover)",
    "FZ 110 (Tree remover)",
    "FZ 110 Turbo plus (Tree remover)",
    "FZ 120 (Tree remover)",
    "FZ 150 (Tree remover)",
    "FZ 160 (Tree remover)",
    "FZ 50 (Tree remover)",
    "FZ 80 (Tree remover)",
    "FZ 90 (Tree remover)"
  ],
  "Peljob": [
    "EB 10",
    "EB 10.4",
    "EB 11 (New) [OEM 250x72x47]",
    "EB 11 (Old) [OEM 230x72x43]",
    "EB 12",
    "EB 12.4",
    "EB 14 (New) [OEM 250x72x45]",
    "EB 14 (Old) [OEM 230x72x43]",
    "EB 14.2",
    "EB 14.4 (New) [OEM 250x72x45]",
    "EB 14.4 (Old) [OEM 230x72x43]",
    "EB 150",
    "EB 150XR [OEM 230x72x43]",
    "EB 150XR [OEM 230x96x33]",
    "EB 150XT",
    "EB 150XTV",
    "EB 16",
    "EB 16.4 (New)",
    "EB 16.4 (Old)",
    "EB 16.5",
    "EB 22.4 (S/N < 16700)",
    "EB 22.4 (S/N > 16699)",
    "EB 246",
    "EB 25.4",
    "EB 250",
    "EB 250XT",
    "EB 251",
    "EB 252",
    "EB 271 ('1998)",
    "EB 28",
    "EB 28.4",
    "EB 28.6",
    "EB 281",
    "EB 30.4",
    "EB 300",
    "EB 306",
    "EB 350",
    "EB 350XT",
    "EB 36 (new)",
    "EB 36 (old)",
    "EB 400",
    "EB 406",
    "EB 450",
    "EB 506",
    "EB 506 ('97)",
    "LS 200",
    "LS 2000",
    "LS 286",
    "LS 386",
    "LS 406",
    "LS 502",
    "SIRIUS",
    "SIRIUS plus",
    "Tiga 68"
  ],
  "Penta Moter": [
    "Jolly",
    "Jolly 20B",
    "Jolly 26B",
    "Jolly 26PK",
    "Maxi dumper",
    "Maxi dumper 20PK",
    "Robot"
  ],
  "Pezzolato": [
    "PZ 250"
  ],
  "Picchio": [
    "1465 (Lifting platform)",
    "1690 (Sky Lifter)"
  ],
  "Piccini": [
    "Dumper",
    "mini 22",
    "minicar 300",
    "minicar 500",
    "minicat 13",
    "minicat 20",
    "minicat 22"
  ],
  "Platform Basket": [
    "RQG 12 (Skylifter)",
    "RQG 12AD (Sky lifter)",
    "RQG 15.75 (Skylifter)",
    "RQG 150AD (Sky lifter)",
    "RQG 18",
    "RQG 18 (Sky lifter)",
    "Spider 13.80 (Sky lifter)",
    "Spider 18.90 (Sky lifter)",
    "Spider 22.10 (Sky lifter)",
    "Spider 27.14 (Sky lifter)",
    "Spider 33.15 (Sky lifter)"
  ],
  "Platinum Lift": [
    "CF 125 (Rotary)"
  ],
  "Porello": [
    "Car 70 (transporter)"
  ],
  "Porrello": [
    "Car 100 (transporter)",
    "Sky lifter"
  ],
  "Positrack": [
    "RCV 85"
  ],
  "Powerfab": [
    "100 X",
    "1200 SX",
    "1200 X",
    "1250",
    "1700 SX",
    "180",
    "HSS 11",
    "High type (Carrier)",
    "Samurai"
  ],
  "Powerpac": [
    "RC 350",
    "RC 500"
  ],
  "Pressoil": [
    "HR 15.1"
  ],
  "Putzmeister": [
    "SPM 300"
  ],
  "QIYUN": [
    "GTJZ06"
  ],
  "RHINOCEROS": [
    "XN 12",
    "XN 16",
    "XN 18"
  ],
  "Rampicar": [
    "R 100",
    "R 100AE",
    "R 35",
    "R 50",
    "R 500 (Mini-carrier)",
    "R 60",
    "R 600",
    "R 600 (Mini-carrier)",
    "R 635",
    "R 70",
    "R 70.1",
    "R 70AE",
    "R 800 (Mini-carrier)",
    "R 900 (Mini-carrier)",
    "Vignoble"
  ],
  "Ramrod": [
    "1150 Taskmaster"
  ],
  "Rayco": [
    "C 85L",
    "RG 35T",
    "RG 37T",
    "RG 40T",
    "RG 45T-R",
    "RG 55T"
  ],
  "Raymar": [
    "TRK 102",
    "TRK 120",
    "TRK 120S",
    "TRK 40",
    "TRK 40LT",
    "TRK 60",
    "TRK 60S"
  ],
  "Renders": [
    "RME 170"
  ],
  "Riebsamen": [
    "Multi-pelle"
  ],
  "Rock": [
    "20"
  ],
  "Rocky Rapid": [
    "BFR 402"
  ],
  "Rolatec": [
    "ML 76A (Drilling machine)"
  ],
  "Rossi": [
    "R 103.3",
    "R 105.3"
  ],
  "Rotomax": [
    "Drilling machine"
  ],
  "Rufener": [
    "RK 1200 (mini-dumper)",
    "RK 1500 (mini-dumper)",
    "RK 500 (mini-dumper)",
    "RK 602 (mini-dumper)",
    "RK 700 (mini-dumper)",
    "RK 900 (mini-dumper)"
  ],
  "SDP Manufacturing": [
    "2500",
    "EZ Hauler55M"
  ],
  "SMC": [
    "MX 08XT",
    "MX 14-1",
    "MX 15",
    "MX 16XT",
    "MX 30",
    "MX 35",
    "MX 50",
    "MX 80"
  ],
  "SUP": [
    "Elefant S19"
  ],
  "Sacet": [
    "KC 28 ALV"
  ],
  "Samsung": [
    "MX 030",
    "SE 50",
    "SE 50-3"
  ],
  "Sandqueen Uk": [
    "Dumper"
  ],
  "Sany": [
    "SY16C",
    "SY26C",
    "SY26U",
    "SY35U",
    "SY50U",
    "SY75C",
    "SY80U"
  ],
  "Sato": [
    "SC 1200",
    "SC 156DD (Mini-carrier)",
    "SC 156DS (Mini-carrier)",
    "SC 433 (Mini-carrier)",
    "SC 433DA (Mini-carrier)",
    "SC 433DH (Mini-carrier)",
    "SC 433LDA (Mini-carrier)",
    "SC 433LDS (Mini-carrier)",
    "SCL 476A (Mini-carrier)"
  ],
  "Satvia": [
    "VB 101R",
    "VT 102R",
    "VT 150R"
  ],
  "Scattrack": [
    "116",
    "118",
    "125",
    "130",
    "135",
    "150",
    "254S",
    "516",
    "520",
    "520V",
    "530",
    "533",
    "535",
    "545"
  ],
  "Schaefer": [
    "DS 1200 (Mini-dumper)"
  ],
  "Schaeff": [
    "H 15",
    "H 24",
    "H 27",
    "HR 02",
    "HR 1",
    "HR 1.5",
    "HR 1.6",
    "HR 11",
    "HR 12 (New)",
    "HR 12 (old)",
    "HR 13 ('2001)",
    "HR 14",
    "HR 14 (< '1995)",
    "HR 14 (> '1995)",
    "HR 16 (< '1995)",
    "HR 16 (> '1995)",
    "HR 18",
    "HR 2 (New)",
    "HR 2 (old)",
    "HR 2.0",
    "HR 20",
    "HR 21",
    "HR 22",
    "HR 24",
    "HR 27",
    "HR 3.7 (new)",
    "HR 3.7 (old)",
    "HR 31",
    "HR 32",
    "HR 32CI",
    "HR 4-A",
    "HR 42",
    "HR 8 (New)",
    "HR 8-A",
    "N 120",
    "TC08",
    "TC10Z"
  ],
  "Sedidrill": [
    "110 (drilling machine)",
    "210 (drilling machine)",
    "250 (drilling machine)",
    "90 (drilling machine)"
  ],
  "Senic": [
    "TSJ 34",
    "TZ 170"
  ],
  "Sequani": [
    "135CS Skylift"
  ],
  "Shibura": [
    "425MA"
  ],
  "Shin-Towa": [
    "CC 104",
    "CC 154",
    "CC 204",
    "CC 205",
    "CC 235",
    "CC 265",
    "CC 266",
    "CC 285",
    "CL 100",
    "NC 180",
    "TC 204"
  ],
  "Showa Aircraft": [
    "SWP 030VCB"
  ],
  "Sicocu": [
    "750DH3"
  ],
  "Sika": [
    "ALIVA 503"
  ],
  "Silea": [
    "45RP"
  ],
  "Silla": [
    "14",
    "18",
    "ME 1400H"
  ],
  "Slane": [
    "HT1000"
  ],
  "Slane International": [
    "Big Dog SL 900",
    "Big Skip HT750 (Mini-carrier)"
  ],
  "Smac": [
    "CC 91 (Aerial work platform)",
    "PC 40III (Lifting platform)"
  ],
  "So.Ca.Ce": [
    "Europlanet 190 C 080 SC (Crane)"
  ],
  "Socomafor": [
    "35R",
    "50R",
    "65 (drilling)"
  ],
  "Soma": [
    "SB 15K",
    "SB 28"
  ],
  "Stanley": [
    "TRACKhorse"
  ],
  "Stenuick": [
    "FORTRACK 200H",
    "S 320"
  ],
  "Straightline": [
    "2062"
  ],
  "Streck": [
    "SF / U (Carrier)"
  ],
  "Sumitomo": [
    "LS 1000FXJ2",
    "LS 1000FXJ3",
    "LS 1200FXJ2",
    "LS 1200FXJ3",
    "LS 1300FXJ2",
    "LS 1300FXJ3",
    "LS 1350UXJ",
    "LS 160",
    "LS 300FXJ",
    "LS 500FXJ",
    "LS 600FXJ",
    "LS 600FXJ3",
    "LS 600PXJ3",
    "LS 700FXJ2",
    "LS 700FXJ3",
    "LS 800FXJ2",
    "LS 800FXJ3",
    "LS 850UXJ",
    "LS 850UXJ2",
    "LS 900FXJ2",
    "LS 900FXJ3",
    "S 100",
    "S 100F2",
    "S 100FJ3",
    "S 120",
    "S 120F2",
    "S 130",
    "S 130F2",
    "S 160B",
    "S 160B2",
    "S 160FJ2",
    "S 30FX",
    "S 30UX-1",
    "S 50F2",
    "S 50K",
    "S 60F2",
    "S 70FX2",
    "S 80F2",
    "S 80FX2",
    "S 90",
    "S 90F2",
    "S 90FX3",
    "S 90FXJ3",
    "SH 10UJ3",
    "SH 12JX",
    "SH 135-2",
    "SH 145",
    "SH 15J",
    "SH 18J",
    "SH 18UJ",
    "SH 18UJ2",
    "SH 20JX",
    "SH 25J",
    "SH 25JX",
    "SH 28J",
    "SH 30J",
    "SH 30JX",
    "SH 30JX2",
    "SH 30U",
    "SH 30UJ",
    "SH 30UJ2",
    "SH 30UJ3",
    "SH 32J",
    "SH 35J",
    "SH 35JX",
    "SH 35JX2",
    "SH 35UJ",
    "SH 38UJ",
    "SH 38UJ2",
    "SH 40JX",
    "SH 40JX2",
    "SH 40UJ2",
    "SH 45J",
    "SH 45J2",
    "SH 45JX",
    "SH 45UJ",
    "SH 55J",
    "SH 55U-2",
    "SH 55UJ",
    "SH 60",
    "SH 60-2",
    "SH 65U",
    "SH 65U-1",
    "SH 65UJ",
    "SH 7GX3",
    "SH 7J",
    "SH 9UX",
    "SH 9UX2",
    "SH 9UX3"
  ],
  "Sunward": [
    "SWE 08",
    "SWE 08B",
    "SWE 15",
    "SWE 15S",
    "SWE 17",
    "SWE 17S",
    "SWE 18UB",
    "SWE 18UF",
    "SWE 25B",
    "SWE 25UF",
    "SWE 28",
    "SWE 35UF",
    "SWE 38",
    "SWE 40U",
    "SWE 50B",
    "SWE 55",
    "SWE 60",
    "SWE 60B",
    "SWE 60UF",
    "SWE 70",
    "SWE 70B",
    "SWE 78",
    "SWE 80",
    "SWE 90",
    "SWTL 4210 (Compact Track Loader)",
    "SWTL 4518 (Compact Track Loader)"
  ],
  "Supertoy": [
    "800T"
  ],
  "TAIANLUYUE": [
    "Y125"
  ],
  "TCP": [
    "Hi-T500 (Mini-carrier)",
    "TCP 500 (Carrier ) Uk market"
  ],
  "TECOINSA": [
    "TP50D"
  ],
  "TES": [
    "29"
  ],
  "TRACCESS": [
    "230"
  ],
  "TRS": [
    "CM 500"
  ],
  "TZ": [
    "C20"
  ],
  "Tadano": [
    "AC 40",
    "AC 45SG (Lifter platform)"
  ],
  "Takeuchi": [
    "Huppi 403",
    "J-4",
    "S 2430LC",
    "TAK 700 (mini-dumper)",
    "TB 007",
    "TB 008",
    "TB 014",
    "TB 014A/LSA",
    "TB 014S/LSA",
    "TB 015",
    "TB 015A",
    "TB 016",
    "TB 016S/LSA",
    "TB 025",
    "TB 030",
    "TB 030UR",
    "TB 035",
    "TB 045",
    "TB 07",
    "TB 070",
    "TB 08",
    "TB 080",
    "TB 105",
    "TB 106",
    "TB 108",
    "TB 10F",
    "TB 10S",
    "TB 1135",
    "TB 1140",
    "TB 1150",
    "TB 12",
    "TB 120",
    "TB 120R",
    "TB 125",
    "TB 125LSA",
    "TB 128",
    "TB 135",
    "TB 135LSA",
    "TB 138FR",
    "TB 14",
    "TB 145",
    "TB 15 (New)",
    "TB 15 (old)",
    "TB 153FR",
    "TB 15F",
    "TB 15FR",
    "TB 16",
    "TB 175",
    "TB 175LSA",
    "TB 180FR",
    "TB 20R",
    "TB 210R",
    "TB 2150",
    "TB 2150R",
    "TB 215R",
    "TB 216",
    "TB 217R [OEM 230x48x68]",
    "TB 225",
    "TB 228",
    "TB 230",
    "TB 235",
    "TB 23R",
    "TB 240",
    "TB 250 [OEM 320x100x43]",
    "TB 250-2",
    "TB 250A",
    "TB 257FR",
    "TB 25FR",
    "TB 260",
    "TB 280FR",
    "TB 285",
    "TB 28FR",
    "TB 290",
    "TB 30UR",
    "TB 38FR",
    "TB 53FR",
    "TB 55R",
    "TB 55UR",
    "TB 650",
    "TB 650S",
    "TB 80FR",
    "TB 980",
    "TC 425LD",
    "TC 850",
    "TC 850S",
    "TCF 850",
    "TCF 850S",
    "TL 10 (Compact Track Loader)",
    "TL 10V2 (Compact Track Loader)",
    "TL 12 (Compact Track Loader)",
    "TL 120 (Compact Track Loader)",
    "TL 12R2 (Compact Track Loader)",
    "TL 12V2 (Compact Track Loader)",
    "TL 130 (Compact Track Loader)",
    "TL 140 (Compact Track Loader)",
    "TL 150 (Compact Track Loader)",
    "TL 220 (Compact Track Loader)",
    "TL 230 (Compact Track Loader)",
    "TL 230-2 (Compact Track Loader)",
    "TL 240 (Compact Track Loader)",
    "TL 250 (Compact Track Loader)",
    "TL 6R (Compact Track Loader)",
    "TL 8 (Compact Track Loader)",
    "TL 8R-2 (Compact Track Loader)",
    "TZ 10"
  ],
  "Tanaka": [
    "DC 153 (mini-carrier)"
  ],
  "Taylorst. Plant": [
    "Hi C40 (TRACKed Crusher) Uk market",
    "Hi T500 (Carrier) Uk market",
    "TCP 500 (Carrier ) Uk market"
  ],
  "Tecniwell": [
    "TWH 5"
  ],
  "Tekna": [
    "K 14",
    "K 14M",
    "K 14S",
    "K 15",
    "K 28S",
    "K 35S",
    "T 13",
    "TC 9"
  ],
  "Terex": [
    "AM 29R",
    "AM 35R",
    "AM 37R",
    "AR 35",
    "HR 14 (< '1995)",
    "HR 14 (> '1995)",
    "HR 16 (< '1995)",
    "HR 16 (> '1995)",
    "PT-100",
    "PT-100F",
    "PT-100G",
    "PT-110",
    "PT-110G",
    "PT-50",
    "PT-60",
    "PT-75",
    "PT-80",
    "R160T",
    "R190T",
    "R350T",
    "TC 125",
    "TC 15",
    "TC 16",
    "TC 19",
    "TC 20",
    "TC 25",
    "TC 29",
    "TC 35",
    "TC 37",
    "TC 48",
    "TC 50",
    "TC 60",
    "TC 75"
  ],
  "Terra Jet": [
    "2514 B (drilling machine)",
    "CITY JET (drilling machine)",
    "TERRA JET (drilling machine)"
  ],
  "Terramac": [
    "RT9"
  ],
  "Terramite": [
    "TX 15",
    "TX 25"
  ],
  "Tescar": [
    "TES 20 (drilling machine)"
  ],
  "Thomas": [
    "175 (VTS System for Skidsteer Loader)",
    "225 TURBO (VTS System for Skidsteer Loader)",
    "245 TURBO (VTS System for Skidsteer Loader)",
    "25G (Skid steer loader)",
    "25GT (Skid steer loader)",
    "35DT (Skid steer loader)",
    "MS 25G (Skid steer loader)",
    "PT 15",
    "T 35DT (Skid steer loader)",
    "T-15S",
    "T-15V",
    "T-25S",
    "T-35S",
    "T-45S"
  ],
  "Tifermec": [
    "T16"
  ],
  "Top Steel": [
    "H115",
    "H85",
    "M26",
    "M31",
    "M41"
  ],
  "Top Tec": [
    "1850E"
  ],
  "Topcat": [
    "ZY55"
  ],
  "Track Star": [
    "28",
    "412",
    "500"
  ],
  "Trackbull": [
    "Dumper"
  ],
  "Trak": [
    "1500D (VTS System for Skidsteer Loader)",
    "1750D ( (VTS System for Skidsteer Loader)",
    "1750D (VTS System for Skidsteer Loader)"
  ],
  "Traklift": [
    "TRA 21"
  ],
  "Trax": [
    "40 (US Market)"
  ],
  "Traxmax": [
    "250",
    "550 (Compact Track Loader)"
  ],
  "Turchi": [
    "300 [OEM350x108x42]",
    "300F [OEM300x55x79]",
    "EK 100B (Mini-dumper)",
    "EK 200P (Mini-dumper)"
  ],
  "Unic": [
    "295",
    "506",
    "B-345 (Crane)",
    "B-506 (Crane)",
    "B-506-5.1 (Crane)",
    "B-775 (Crane)",
    "SMK 320.67 (Crane)",
    "UR 255CA",
    "URA-376CL (Crane)",
    "URA-506CL (Crane)",
    "URW-094 (Crane)",
    "URW-547 (Crane)",
    "URW-A 095CR (Crane)",
    "URW-A 295CR (Crane)",
    "W295 (Crane)"
  ],
  "Unimov": [
    "1250"
  ],
  "Unkauf": [
    "KMB 114G"
  ],
  "Upright": [
    "MXC 15"
  ],
  "Utex": [
    "1.03"
  ],
  "VIMALFIRE": [
    "Emergency Robot-G1"
  ],
  "Velcodrill": [
    "WD 100"
  ],
  "Venieri": [
    "VF121",
    "VF141",
    "VF161",
    "VF171"
  ],
  "Vermeer": [
    "1.2 ton",
    "502 SP (Stump Cutter)",
    "BC1400TX",
    "BC150TX",
    "CTX 100",
    "CTX 160",
    "CTX 50",
    "CX 216 (mini-excavator)",
    "CX 218 (mini-excavator)",
    "CX 219 (mini-excavator)",
    "CX 224 (mini-excavator)",
    "CX 229 (mini-excavator)",
    "CX 234 (mini-excavator)",
    "CX 254 (mini-excavator)",
    "D10a Navigator (H.D. Drilling machine)",
    "D10x15 Navigator (H.D. Drilling machine)",
    "D16x20 Navigator (H.D. Drilling machine) [OEM 230x72x54]",
    "D16x20a Navigator (H.D. Drilling machine) [OEM 230x72x54]",
    "D20X22 series 2 (Directional drill)",
    "D23X30 series 3 (Directional drill)",
    "D4",
    "D6x6 Navigator (H.D. Drilling machine)",
    "D7",
    "D7x11 Navigator (H.D. Drilling machine)",
    "D7x11a Navigator (H.D. Drilling machine)",
    "D8x10 (H.D. Drilling machine)",
    "D9x13 Navigator (H.D. Drilling machine)",
    "G10x15",
    "RTX 100 (Stump cutter)",
    "RTX 1250 (Quad)",
    "RTX 150",
    "RTX 250",
    "RTX 450",
    "S400TX (Mini Compact Track Loader)",
    "S450TX (Mini Compact Track Loader)",
    "S600TX (Mini Compact Track Loader)",
    "S650TX (Mini Compact Track Loader)",
    "S725TX (Mini Compact Track Loader)",
    "S800TX (Mini Compact Track Loader)",
    "S925TX (Mini Compact Track Loader)",
    "SC 30TX (Stump cutter)",
    "SC 502SP (Stump cutter)",
    "SC 505 (Stump cutter)",
    "SC 60TX (Stump cutter)",
    "SC 70TX (Stump cutter)"
  ],
  "Vnk Crane Europe": [
    "URW A295CR"
  ],
  "Volvo": [
    "EC 13",
    "EC 13XR",
    "EC 13XTV",
    "EC 14",
    "EC 15",
    "EC 15 (bi-speed / adj. Width)",
    "EC 15 (bi-speed)",
    "EC 15B",
    "EC 15B XR",
    "EC 15B XTV",
    "EC 15D",
    "EC 15R",
    "EC 15RB",
    "EC 15T",
    "EC 15TB",
    "EC 15V",
    "EC 15VB",
    "EC 15XR",
    "EC 15XT",
    "EC 15XTV",
    "EC 17",
    "EC 18",
    "EC 18D",
    "EC 25",
    "EC 25-281",
    "EC 25X",
    "EC 25XT",
    "EC 27C",
    "EC 30",
    "EC 30B",
    "EC 30X",
    "EC 35",
    "EC 35C",
    "EC 35D",
    "EC 45",
    "EC 45Pro",
    "EC 55",
    "EC 55B",
    "EC 55C",
    "EC 60E",
    "ECR 25D",
    "ECR 28",
    "ECR 35D",
    "ECR 38",
    "ECR 40D",
    "ECR 48C",
    "ECR 50D",
    "ECR 58",
    "ECR 58D",
    "ECR 88",
    "ECR 88D",
    "MC 110 (VTS System for Skidsteer Loader)",
    "MC 70 (Compact Track Loader)",
    "MC 70 (VTS System for Skidsteer Loader)",
    "MC 80 (VTS System for Skidsteer Loader",
    "MC 80 (VTS System for Skidsteer Loader)",
    "MC 90 (VTS System for Skidsteer Loader)",
    "MCT 110C (Compact Track Loader)",
    "MCT 125C (Compact Track Loader)",
    "MCT 135C (Compact Track Loader)",
    "MCT 145C (Compact Track Loader)",
    "MCT 85C (Compact Track Loader)"
  ],
  "WAMET": [
    "KB-2G",
    "KB-3G",
    "MWG-1 [OEM 230x72x43]",
    "MWG-6"
  ],
  "Wacker Neuson": [
    "11002HV",
    "11002RD",
    "1101CP (Compact Track Loader)",
    "1200",
    "12002",
    "12002RD",
    "12002RD Vario",
    "1200RD",
    "1202",
    "1302",
    "1302RD",
    "1302RD SLR",
    "1400RD",
    "1402",
    "1402RD (OEM 230x72x43)",
    "1402RD (OEM 230x96x33)",
    "1402RD Force",
    "1402RD Primus",
    "1402RD SLR",
    "1402RD SLR Primus",
    "1403",
    "1403 ('2002)",
    "1403RD",
    "1404",
    "14504",
    "1500",
    "1500RD",
    "1500RD SLR",
    "1501",
    "1502",
    "1502RD",
    "1502RD Force",
    "1502RD SLR",
    "1503",
    "1503RD",
    "1503RDV",
    "1600RD",
    "1700",
    "1700RB",
    "1700RD",
    "1702",
    "1702RD",
    "1703",
    "1703 RD",
    "1703 VDS",
    "1900",
    "1900RD",
    "1902",
    "1902RD (New)",
    "1902RD (old)",
    "1902RD Force",
    "1902RD SLR (New)",
    "1902RD SLR (old)",
    "1903",
    "1903RD",
    "2000",
    "2000RD",
    "2002 Force",
    "2002 RDV",
    "2003",
    "2100",
    "2100RD",
    "2200",
    "2200RD",
    "2201",
    "2202",
    "2202RD",
    "2202RD Force",
    "2203",
    "2203RD",
    "2300",
    "2300RD",
    "2404RD",
    "250",
    "2500",
    "2500RD",
    "2503",
    "2503RD",
    "2503RDV",
    "2600",
    "2600RD (New)",
    "2700",
    "2700RD",
    "2702",
    "2702RD",
    "2702RD Force",
    "2702RD SCR",
    "2702RD SLR",
    "2800",
    "2800RD (New)",
    "28Z-3",
    "28Z3 RD",
    "2902",
    "2902RD",
    "2902RD Force",
    "2902RD SLR",
    "3000",
    "3000RD (New)",
    "3000RDV",
    "3002",
    "3003",
    "3003 RD",
    "3003 Vario",
    "3003RD",
    "3200RD (New)",
    "3402",
    "3402RD",
    "3402RD Force",
    "3402RD SLR",
    "3503",
    "3503 VDS",
    "3503 Vario",
    "3503RD",
    "3503RD Vario",
    "3602",
    "3602RD",
    "3602RD Force",
    "3602RD SLR",
    "3703",
    "3703RD",
    "38Z-3",
    "38Z3",
    "5000RD",
    "5001",
    "5001RD",
    "5001RD SLR",
    "5002",
    "5002 Power",
    "5002RD",
    "50Z-3",
    "50Z-3RD",
    "6002",
    "6002RD",
    "6002RDV",
    "6003",
    "6003RD",
    "7002RD",
    "70Z-3RD",
    "75Z-3",
    "8002",
    "8002RD",
    "8002RDV",
    "8003 Vario",
    "8003RD",
    "803RD",
    "9002",
    "DT 08 (Dumper)",
    "DT 10 (Dumper)",
    "DT 10e (Dumper)",
    "DT 12 (Dumper)",
    "DT 15 (Duper)",
    "ET145",
    "ET16",
    "ET18",
    "ET20",
    "ET24",
    "ET35",
    "ET58",
    "ET65",
    "ET90",
    "EZ17",
    "EZ17e",
    "EZ26",
    "EZ28",
    "EZ36",
    "EZ38",
    "EZ50",
    "EZ53",
    "EZ80",
    "RK 15 (Carrier)",
    "SM325-27T",
    "ST 28",
    "ST 31",
    "ST 35",
    "ST 45",
    "TD 15 (Carrier)",
    "TD 9 (Dumper)",
    "Unitrac BF 250"
  ],
  "Wyssen": [
    "W-10/RK700"
  ],
  "XCMG": [
    "XE55U"
  ],
  "Yamaguchi / Winbull": [
    "TXB-21",
    "WB 04",
    "WB 05 (minidumper)",
    "WB 05 (minidumper) '2004",
    "WB 06D (minidumper)",
    "WB 06D HL (Minidumper - High Lift)",
    "WB 07 (minidumper)",
    "WB 1000-3 (minidumper)",
    "WB 12H (minidumper)",
    "WB 1300-3 (minidumper)",
    "WB 1500-3 (minidumper)",
    "WB 350FB (minidumper)",
    "WB 350SF (minidumper)",
    "WB 450HD (minitdumper)",
    "WB 450MD (minidumper)",
    "WB 500 (minidumper)",
    "WB 510 (minidumper)",
    "WB 510B (minidumper)",
    "WB 700 (minidumper)",
    "WB 700EX (minidumper)",
    "WB12H alpha"
  ],
  "Yanmar": [
    "5 D-1",
    "8 R",
    "Aura 28",
    "B 07",
    "B 07-1",
    "B 08 Scopy",
    "B 08 [OEM 180x72x32]",
    "B 08-3 ('2002)",
    "B 08-3RV",
    "B 08R Scopy",
    "B 08RV Scopy",
    "B 10",
    "B 10R",
    "B 12",
    "B 12-1",
    "B 12-2",
    "B 12-3",
    "B 12-3 ('2002)",
    "B 12-3PR",
    "B 12PR",
    "B 14 Check Length",
    "B 14-1",
    "B 15 [OEM 230x72x43]",
    "B 15-3 ('2002)",
    "B 15-3CR",
    "B 15-3EX",
    "B 15-3PR",
    "B 15CR",
    "B 15EX",
    "B 15MC",
    "B 15PR",
    "B 17",
    "B 17-1",
    "B 17-2",
    "B 17-2 (< '2000)",
    "B 17-3",
    "B 17-3EX",
    "B 17EX",
    "B 17PR",
    "B 18EX",
    "B 19",
    "B 19.2",
    "B 19PR",
    "B 1U",
    "B 25V (Victas: offset type)",
    "B 25V (Victas: offset type) >'2006",
    "B 25VCR (Offset type)",
    "B 25VCR (Victas: offset type) > '2006",
    "B 27-2A [OEM 300x55.5(k)x76]",
    "B 27-2B (Offset type)",
    "B 3-3",
    "B 30V (Victas: Offset type)",
    "B 30VCR (Victas: Offset type)",
    "B 30VPR (Victas: Offset type)",
    "B 37-2B (Offset type)",
    "B 37V (Victas: Offset type)",
    "B 37VCR (Offset type)",
    "B 37VPR (Offset type)",
    "B 3U",
    "B 40VIO",
    "B 4U",
    "B 50-2B (Offset type)",
    "B 50V (Victas: Offset type)",
    "B 50VCR (Victas: Offset type)",
    "B 50VIO",
    "B 7 Pro Sigma",
    "B 7 Sigma",
    "B 7U",
    "B6-3",
    "C 08 (Carrier)",
    "C 10R (Carrier)",
    "C 10R-1 (Carrier)",
    "C 12R (Carrier)",
    "C 50R-1 (carrier) [OEM 450x110x74]",
    "C 50R-1 (carrier) [OEM 500x90x82]",
    "C 8R (Carrier)",
    "CD 7CDA",
    "CG 3 HAST (Carrier)",
    "CG 3D (Carrier)",
    "CR 10",
    "CR 12R",
    "DC 153",
    "K4SC (Sky lifter)",
    "MCG 100 (Carrier)",
    "MCG 111F (Carrier)",
    "MCG 130 (Carrier)",
    "MCG 131 (Carrier)",
    "MCG 150 (Carrier)",
    "MCG 91 (Carrier)",
    "MCG 95 (Carrier)",
    "MCG 95 N-HST",
    "MCG 950 (Carrier)",
    "SV 08",
    "SV 09",
    "SV 100",
    "SV 100VCR",
    "SV 120",
    "SV 15",
    "SV 15CR",
    "SV 15PR",
    "SV 16",
    "SV 17",
    "SV 17CR",
    "SV 17CRE",
    "SV 17EX",
    "SV 18EX",
    "SV 20",
    "SV 22",
    "SV 26",
    "SV 60",
    "T175 (Compact Track Loader)",
    "T210 (Compact Track Loader)",
    "VIO 10",
    "VIO 100",
    "VIO 12",
    "VIO 15",
    "VIO 15-2",
    "VIO 17 [OEM 230x72x46]",
    "VIO 17 [OEM 230x72x47]",
    "VIO 17PR [OEM 230x72x47]",
    "VIO 20",
    "VIO 20 Global",
    "VIO 20-1",
    "VIO 20-2",
    "VIO 20-3 (offset type)",
    "VIO 20-4 (offset type)",
    "VIO 20CR",
    "VIO 20PR-1",
    "VIO 25 [OEM 250x55.5x79 Symetric)",
    "VIO 25 [OEM 260x55.5x78 Offset)",
    "VIO 25-4",
    "VIO 25-6",
    "VIO 25PR",
    "VIO 26",
    "VIO 27",
    "VIO 27-2 (Offset type)",
    "VIO 27-2 Global (Offset type)",
    "VIO 27-3",
    "VIO 27-5",
    "VIO 27-6",
    "VIO 30-1",
    "VIO 30-2",
    "VIO 30-3S",
    "VIO 30-6",
    "VIO 30V (Offset type)",
    "VIO 33 (Offset type)",
    "VIO 33-6",
    "VIO 35 (Offset type)",
    "VIO 35 Global",
    "VIO 35-1 (Offset type)",
    "VIO 35-2 (Offset type)",
    "VIO 35-3 (Offset type)",
    "VIO 35-5 (Offset type)",
    "VIO 35-6",
    "VIO 35CR (Offset type)",
    "VIO 38 (Offset type)",
    "VIO 38-6",
    "VIO 40 (Offset type)",
    "VIO 40-1 (Offset type)",
    "VIO 40-2 (Offset type)",
    "VIO 40-3 (Offset type)",
    "VIO 40V (Offset type)",
    "VIO 45 (Offset type)",
    "VIO 45 CR",
    "VIO 45 Global (Offset type)",
    "VIO 45-3 (Offset type)",
    "VIO 45-5 (Offset type)",
    "VIO 45-6",
    "VIO 45V (Offset type)",
    "VIO 50-1 (Offset type)",
    "VIO 50-2 (Offset type)",
    "VIO 50-2 Global",
    "VIO 50-3 (Offset type)",
    "VIO 50-6",
    "VIO 50-PR-1",
    "VIO 50U (Offset type)",
    "VIO 50V (Offset type)",
    "VIO 55 (Offset type)",
    "VIO 55 CR",
    "VIO 55-3 (Offset type)",
    "VIO 55-5 (Offset type)",
    "VIO 55-6",
    "VIO 57-6",
    "VIO 57U",
    "VIO 70",
    "VIO 70A (Offset type)",
    "VIO 70CR",
    "VIO 75 (Offset type)",
    "VIO 75-A (Offset type)",
    "VIO 80 (Offset type)",
    "VIO 80-1",
    "VIO 82",
    "WB 1300",
    "WB 500 (minidumper)",
    "Y 12",
    "Y 12B",
    "Y 14",
    "YB 10",
    "YB 10-2",
    "YB 101",
    "YB 101UZ",
    "YB 101VL",
    "YB 121",
    "YB 125",
    "YB 151",
    "YBT 650",
    "YEW 5D-1",
    "YEW 8R",
    "YFW 8R (Mini-dumper)",
    "YM 10",
    "YMD 60"
  ],
  "Ygry": [
    "M 120",
    "SA 140",
    "SA 170",
    "Y 12",
    "Y 12B",
    "Y 14",
    "Y 14B",
    "Y 15"
  ],
  "Yuchai": [
    "R 103.3",
    "R 105.3",
    "WY 1.3",
    "WY 2.5",
    "WY 3.5",
    "YC 15-7",
    "YC 15-8",
    "YC 25",
    "YC 25-2",
    "YC 25-8",
    "YC 30-2",
    "YC 35 SR",
    "YC 35-7",
    "YC 35-8",
    "YC 45 [OEM 300x55x86]",
    "YC 45-6 [OEM 300x55x94]",
    "YC 55-2",
    "YC 85",
    "YC 85-7"
  ],
  "Yutani": [
    "B 53",
    "B 76",
    "Z 53",
    "Z 54",
    "Z 55"
  ],
  "Zavattini": [
    "E19P/9SC"
  ],
  "Zeppelin": [
    "ZR 02",
    "ZR 14",
    "ZR 15",
    "ZR 25",
    "ZR 35",
    "ZR 45",
    "ZR 55",
    "ZRH 02",
    "ZRH 04",
    "ZRH 12",
    "ZRH 14",
    "ZRH 16",
    "ZRH 8"
  ],
  "Zhenyu": [
    "ZY 55"
  ],
  "Zntsis Brzesko": [
    "RT-10"
  ]
};

// Machine to track size compatibility
// Key format: "Brand|Model"
export const fullMachineCompatibility: Record<string, string[]> = {
  "A.X.I.|FR300AA (Crane)": [
    "300x55x82",
    "300x52.5x84"
  ],
  "ACM|ME040": [
    "300x55x82",
    "300x52.5x84"
  ],
  "ALLEN|AT14F": [
    "180x72x37"
  ],
  "ALLEN|AT16": [
    "180x72x42"
  ],
  "ALLtrack|AT1500": [
    "700x100x98"
  ],
  "ALLtrack|AT2200": [
    "750x150x66"
  ],
  "ASV|MD-70": [
    "18x4x220",
    "457x101.6x55"
  ],
  "ASV|POSI-TRAC 2800": [
    "18x4x220",
    "457x101.6x55"
  ],
  "ASV|POSI-TRAC 2810": [
    "18x4x220",
    "457x101.6x55"
  ],
  "ASV|POSI-TRAC 4800": [
    "18x4x220",
    "457x101.6x55"
  ],
  "ASV|POSI-TRAC 4810": [
    "18x4x220",
    "457x101.6x55"
  ],
  "ASV|POSI-TRAC HD4500": [
    "18x4x220",
    "457x101.6x55"
  ],
  "ASV|POSI-TRAC HD4520": [
    "18x4x220",
    "457x101.6x55"
  ],
  "ASV|PT 100": [
    "18x4x220",
    "457x101.6x55"
  ],
  "ASV|PT 50": [
    "15x4x166",
    "381x101.6x42"
  ],
  "ASV|PT 60": [
    "15x4x166",
    "381x101.6x42"
  ],
  "ASV|PT 80": [
    "18x4x201",
    "457x101.6x51"
  ],
  "ASV|RC 100": [
    "18x4x200",
    "457x101.6x50"
  ],
  "ASV|RC 50": [
    "15x4x166",
    "381x101.6x42"
  ],
  "ASV|RC 60": [
    "15x4x166",
    "381x101.6x42"
  ],
  "ASV|RC 85": [
    "18x4x200",
    "457x101.6x50"
  ],
  "ASV|RCV": [
    "18x4x200",
    "457x101.6x50"
  ],
  "ASV|RT 50": [
    "15x4x166",
    "381x101.6x42"
  ],
  "ASV|RT 65": [
    "15x4x166",
    "381x101.6x42"
  ],
  "ASV|RT 75": [
    "18x4x201",
    "457x101.6x51"
  ],
  "ASV|SC-50": [
    "15x4x166",
    "381x101.6x42"
  ],
  "ASV|SR-80": [
    "18x4x201",
    "457x101.6x51"
  ],
  "ASV|ST-50": [
    "15x4x166",
    "381x101.6x42"
  ],
  "ASV|VT-70": [
    "15x4x166",
    "381x101.6x42"
  ],
  "ATN|ATN | PIAF450 (Platform - non-marking tracks)": [
    "230x96x32",
    "230x48x64"
  ],
  "ATN|ATN | PIAF560 (Platform - non-marking tracks)": [
    "230x96x32",
    "230x48x64"
  ],
  "ATN|ATN | PIAF800 (Platform - non-marking tracks)": [
    "230x96x34",
    "230x48x68"
  ],
  "ATN|ATN | PIAF810": [
    "230x96x34",
    "230x48x68"
  ],
  "ATN|ATN | PIAF811": [
    "230x96x34",
    "230x48x68"
  ],
  "Abbati|BBT954-5.16": [
    "180x72x37"
  ],
  "Abbati|BBT954-5.17": [
    "180x60x38"
  ],
  "Aces|HTC500 (Dumper)": [
    "180x60x37"
  ],
  "Active|PT1300": [
    "180x60x30"
  ],
  "Active|PT1320": [
    "180x60x34"
  ],
  "Active|PT1460": [
    "180x60x37"
  ],
  "Agri|DM10": [
    "230x72x43"
  ],
  "Aichi|FR300 (Crane)": [
    "300x55x82",
    "300x52.5x84"
  ],
  "Aichi|RM040": [
    "200x72x42"
  ],
  "Aichi|RV040 (Lifting platform)": [
    "200x72x42"
  ],
  "Aichi|RV041 (Lifting platform)": [
    "200x72x42"
  ],
  "Aichi|RV042 (Lifting platform)": [
    "230x72x50"
  ],
  "Aichi|RV04A (Lifting platform)": [
    "230x72x42",
    "200x72x42"
  ],
  "Aichi|RV060 (Lifting platform)": [
    "230x72x56"
  ],
  "Aichi|RV061 (Lifting platform)": [
    "230x72x56"
  ],
  "Airman|AX 17": [
    "230x96x33",
    "230x48x66"
  ],
  "Airman|AX 17 - 2": [
    "230x96x33",
    "230x48x66"
  ],
  "Airman|AX 17 - 2N": [
    "230x96x33",
    "230x48x66"
  ],
  "Airman|AX 17CGL-2N": [
    "230x96x33",
    "230x48x66"
  ],
  "Airman|AX 17U": [
    "230x96x35",
    "230x48x70"
  ],
  "Airman|AX08": [
    "180x72x37"
  ],
  "Airman|AX08-02": [
    "180x72x37"
  ],
  "Airman|AX08-2KT": [
    "180x72x37"
  ],
  "Airman|AX08GL-2": [
    "180x72x37"
  ],
  "Airman|AX10U": [
    "180x72x40"
  ],
  "Airman|AX12": [
    "230x96x31",
    "230x48x62"
  ],
  "Airman|AX12-2": [
    "230x96x31",
    "230x48x62"
  ],
  "Airman|AX15": [
    "230x96x31",
    "230x48x62"
  ],
  "Airman|AX15 U": [
    "230x96x31",
    "230x48x62"
  ],
  "Airman|AX15-2": [
    "230x96x31",
    "230x48x62"
  ],
  "Airman|AX16": [
    "230x96x33",
    "230x48x63"
  ],
  "Airman|AX16-2": [
    "230x96x33",
    "230x48x66"
  ],
  "Airman|AX16-3": [
    "230x96x33",
    "230x48x66"
  ],
  "Airman|AX16CBL-3": [
    "230x96x33",
    "230x48x66"
  ],
  "Airman|AX18-2": [
    "250x52.5x73",
    "300x52.5x72"
  ],
  "Airman|AX19U": [
    "230x48x70"
  ],
  "Airman|AX20-3": [
    "250x107x38",
    "300x52.5x76"
  ],
  "Airman|AX20U": [
    "250x96x41",
    "250x47x84",
    "250x48x82"
  ],
  "Airman|AX20UR": [
    "250x107x38",
    "250x52.5x76",
    "300x52.5x76"
  ],
  "Airman|AX22": [
    "250x52.5x73",
    "300x52.5x72"
  ],
  "Airman|AX22-1": [
    "250x52.5x73",
    "300x52.5x72"
  ],
  "Airman|AX22-2": [
    "250x52.5x73",
    "300x52.5x72"
  ],
  "Airman|AX22CGL": [
    "250x52.5x73",
    "300x52.5x72"
  ],
  "Airman|AX22UCGL": [
    "250x52.5x73",
    "300x52.5x72"
  ],
  "Airman|AX22UCGL4": [
    "250x52.5x73",
    "300x52.5x72"
  ],
  "Airman|AX25": [
    "300x55x74",
    "250x52.5x76",
    "300x52.5x76"
  ],
  "Airman|AX25-1": [
    "300x55x74",
    "250x52.5x76",
    "300x52.5x76"
  ],
  "Airman|AX25-2": [
    "300x55x74",
    "250x52.5x76",
    "300x52.5x76"
  ],
  "Airman|AX25-3": [
    "250x52.5x73",
    "300x52.5x72"
  ],
  "Airman|AX26U-6": [
    "300x52.5x80"
  ],
  "Airman|AX27": [
    "300x52.5x78"
  ],
  "Airman|AX27U": [
    "300x52.5x78"
  ],
  "Airman|AX27U-4": [
    "300x52.5x80"
  ],
  "Airman|AX29UCGL": [
    "300x52.5x78"
  ],
  "Airman|AX30": [
    "300x55x80",
    "300x52.5x82"
  ],
  "Airman|AX30-1": [
    "300x52.5x82",
    "300x52.5x86"
  ],
  "Airman|AX30-2": [
    "300x55x80",
    "300x52.5x82"
  ],
  "Airman|AX30-3": [
    "300x52.5x82"
  ],
  "Airman|AX30U-4": [
    "300x52.5x86"
  ],
  "Airman|AX30UR": [
    "300x52.5x76"
  ],
  "Airman|AX30UR-1": [
    "300x55x74",
    "250x52.5x76",
    "300x52.5x76"
  ],
  "Airman|AX30UR-2": [
    "300x55x74",
    "250x52.5x76",
    "300x52.5x76"
  ],
  "Airman|AX30UR-3": [
    "300x52.5x82"
  ],
  "Airman|AX32U": [
    "300x52.5x82"
  ],
  "Airman|AX33MU": [
    "300x52.5x82"
  ],
  "Airman|AX33U": [
    "300x52.5x82"
  ],
  "Airman|AX33U-6": [
    "300x52.5x82"
  ],
  "Airman|AX35": [
    "300x55x80",
    "300x52.5x82"
  ],
  "Airman|AX35-1": [
    "300x55x80",
    "300x52.5x82"
  ],
  "Airman|AX35-2": [
    "300x52.5x82"
  ],
  "Airman|AX35CGL-3": [
    "300x52.5x82"
  ],
  "Airman|AX35U": [
    "300x52.5x86"
  ],
  "Airman|AX35U-4": [
    "300x52.5x86"
  ],
  "Airman|AX36U": [
    "300x52.5x86"
  ],
  "Airman|AX36UCGL": [
    "300x52.5x86"
  ],
  "Airman|AX38UCGL": [
    "300x52.5x86"
  ],
  "Airman|AX40": [
    "400x72.5x72"
  ],
  "Airman|AX40-2": [
    "400x72.5x72"
  ],
  "Airman|AX40U": [
    "400x72.5x72"
  ],
  "Airman|AX40U-4": [
    "400x73x72",
    "400x72.5x72"
  ],
  "Airman|AX40UR-1": [
    "400x72.5x72"
  ],
  "Airman|AX40UR-2": [
    "400x72.5x72"
  ],
  "Airman|AX45": [
    "400x72.5x72"
  ],
  "Airman|AX45-2": [
    "400x72.5x72"
  ],
  "Airman|AX45CGL-2": [
    "400x72.5x72"
  ],
  "Airman|AX50": [
    "400x142x37",
    "400x72.5x72"
  ],
  "Airman|AX50-2": [
    "400x72.5x72"
  ],
  "Airman|AX50-3": [
    "400x73x72",
    "400x72.5x72"
  ],
  "Airman|AX50U": [
    "400x72.5x72"
  ],
  "Airman|AX50U-4": [
    "400x73x74",
    "400x72.5x74"
  ],
  "Airman|AX50UCGL": [
    "400x72.5x72"
  ],
  "Airman|AX52UCGL-5": [
    "400x72.5x74"
  ],
  "Airman|AX55U-6A": [
    "400x72.5x74"
  ],
  "Airman|AX55UR": [
    "400x72.5x72"
  ],
  "Airman|AX55UR-3": [
    "400x72.5x72"
  ],
  "Airman|AX58": [
    "400x72.5x74"
  ],
  "Airman|AX58MU": [
    "400x73x74",
    "400x72.5x74"
  ],
  "Airman|AXC12": [
    "230x96x31",
    "230x48x62"
  ],
  "Airman|AXC15": [
    "230x96x31",
    "230x48x62"
  ],
  "Airman|HM07S": [
    "180x72x36"
  ],
  "Airman|HM10": [
    "200x72x42"
  ],
  "Airman|HM10 NEW": [
    "20x96x33",
    "230x48x66"
  ],
  "Airman|HM10G": [
    "200x72x42"
  ],
  "Airman|HM10SG": [
    "200x72x42"
  ],
  "Airman|HM15": [
    "200x72x42"
  ],
  "Airman|HM15 NEW": [
    "230x96x33",
    "230x48x66"
  ],
  "Airman|HM15S": [
    "200x72x42"
  ],
  "Airman|HM30SGZ": [
    "300x109x40",
    "300x52.5x82"
  ],
  "Airman|HM35": [
    "300x109x42",
    "300x52.5x86"
  ],
  "Airman|HM45": [
    "400x146x36",
    "400x72.5x72"
  ],
  "Airman|HM45-2": [
    "400x146x36",
    "400x72.5x72"
  ],
  "Airman|HM45SG-2": [
    "400x146x36",
    "400x72.5x72"
  ],
  "Airman|HM50": [
    "400x146x36",
    "400x72.5x72"
  ],
  "Airman|HM55": [
    "400x146x36",
    "400x72.5x72"
  ],
  "Airman-Foredil|AX 16-2N": [
    "230x96x33",
    "230x48x66"
  ],
  "Airman-Foredil|AX 29U": [
    "300x52.5x78"
  ],
  "Airman-Foredil|AX 35": [
    "300x55x80",
    "300x52.5x82"
  ],
  "Airman-Foredil|AX 45": [
    "400x72.5x72"
  ],
  "Airman-Foredil|AX22": [
    "250x52.5x73",
    "300x52.5x72"
  ],
  "Almac|Athena-870": [
    "250x72x57"
  ],
  "Almac|BIBI-1090EVO": [
    "250x72x64"
  ],
  "Almac|BIBI-1250CL": [
    "250x72x64"
  ],
  "Almac|BIBI-1470HE": [
    "250x72x64"
  ],
  "Almac|BIBI-850BL": [
    "250x72x57"
  ],
  "Almac|BIBI-850HE": [
    "200x72x47"
  ],
  "Almac|BIBI-870BL": [
    "250x72x57"
  ],
  "Almac|BIEASY1,5": [
    "230x72x43"
  ],
  "Almac|MULTI-LOADER 2.5": [
    "250x72x64"
  ],
  "Amerequip Eagle|TRAX40": [
    "230x96x39",
    "250x48x78"
  ],
  "American Direction Drill|DD10": [
    "230x72x56"
  ],
  "American Direction Drill|DD2": [
    "230x72x56"
  ],
  "American Direction Drill|DD3": [
    "320x52.5x88",
    "300x52.5x88"
  ],
  "American Direction Drill|DD4": [
    "300x54x82",
    "300x52.5x84"
  ],
  "American Direction Drill|DD6": [
    "400x73x74",
    "400x72.5x74"
  ],
  "American Direction Drill|DD8": [
    "400x73x74",
    "400x72.5x74"
  ],
  "Ammann|AMX 65": [
    "400x72.5x76"
  ],
  "Ammann|AMX85ZT": [
    "450x76x82"
  ],
  "Andreoli|UT60EVO": [
    "230x78x42"
  ],
  "Angel|WY1.3": [
    "230x72x43"
  ],
  "Angel|WY2.5": [
    "300x55x76",
    "300x52.5x78"
  ],
  "Angel|WY3.5": [
    "300x55x82",
    "300x52.5x84"
  ],
  "Antec|A12B": [
    "230x72x43"
  ],
  "Antec|A14sa": [
    "230x72x43"
  ],
  "Antec|HCC1051D": [
    "180x72x37"
  ],
  "Apageo|450 (H.D Drilling Machine)": [
    "250x72x52"
  ],
  "Apageo|580 (H.D Drilling Machine)": [
    "250x72x52"
  ],
  "Apageo|LWC100 ( Drilling Machine)": [
    "250x72x57"
  ],
  "Aros China|1.5": [
    "230x72x43"
  ],
  "Astec|Mini-Excavator": [
    "250x72x56",
    "300x52.5x92"
  ],
  "Atex|XC750D": [
    "200x72x38",
    "180x72x38"
  ],
  "Atex|XG450M": [
    "200x72x39"
  ],
  "Athena|1090 (Lifting Platform)": [
    "250x72x64"
  ],
  "Atlas|100": [
    "200x72x41"
  ],
  "Atlas|100B": [
    "200x72x41"
  ],
  "Atlas|100CT": [
    "200x72x41"
  ],
  "Atlas|110": [
    "200x72x41"
  ],
  "Atlas|1104": [
    "200x72x41"
  ],
  "Atlas|120": [
    "230x72x43"
  ],
  "Atlas|120AB": [
    "230x72x42"
  ],
  "Atlas|120RF": [
    "230x72x43"
  ],
  "Atlas|404": [
    "230x72x43"
  ],
  "Atlas|404R": [
    "230x72x43"
  ],
  "Atlas|604": [
    "250x72x57"
  ],
  "Atlas|604.2": [
    "300x109x39",
    "300x52.5x80"
  ],
  "Atlas|604.2 (96)": [
    "300x109x39",
    "300x52.5x80"
  ],
  "Atlas|604R": [
    "250x72x57"
  ],
  "Atlas|605R": [
    "400x72.5x72"
  ],
  "Atlas|805R": [
    "450x71x86"
  ],
  "Atlas|AM29R": [
    "300x55x72",
    "300x52.5x74"
  ],
  "Atlas|AM37R": [
    "300x52.5x86"
  ],
  "Atlas|AP604": [
    "230x72x43",
    "320x100x41"
  ],
  "Atlas|AR100": [
    "230x72x42"
  ],
  "Atlas|AR120": [
    "230x72x42"
  ],
  "Atlas|CT045": [
    "200x72x34",
    "180x72x34"
  ],
  "Atlas|CT100": [
    "200x72x41"
  ],
  "Atlas|CT100R": [
    "200x72x41"
  ],
  "Atlas|CT10N": [
    "230x72x43"
  ],
  "Atlas|CT120": [
    "230x72x42"
  ],
  "Atlas|CT12N": [
    "230x72x43"
  ],
  "Atlas|CT27N": [
    "300x109x36",
    "300x52.5x74"
  ],
  "Atlas|CT30N": [
    "300x109x39",
    "300x52.5x80"
  ],
  "Atlas|CT35N": [
    "300x109x41",
    "300x52.5x84"
  ],
  "Atlas|CT50N": [
    "400x142x38",
    "400x72.5x74"
  ],
  "Atlas|CT7NX": [
    "180x72x37"
  ],
  "Atlas|ISO7": [
    "180x72x37"
  ],
  "Ausa|25CM": [
    "180x60x30"
  ],
  "Ausa|75": [
    "200x72x42"
  ],
  "Ausa|80CMA": [
    "250x72x48"
  ],
  "Ausa|MH08": [
    "180x72x38"
  ],
  "Ausa|MH15": [
    "230x48x66",
    "230x96x33"
  ],
  "Ausa|MH25": [
    "300x52.5x74"
  ],
  "Ausa|MH35": [
    "300x52.5x84"
  ],
  "Ausa|MH35R": [
    "300x52.5x84"
  ],
  "Ausa|MH55": [
    "400x72.5x72"
  ],
  "Ausa|MH75": [
    "450x71x86"
  ],
  "Avant Tecno|Dumper 1200": [
    "230x72x45"
  ],
  "Avant Tecno|Dumper 1500": [
    "250x72x45"
  ],
  "Awasi|75-6": [
    "450x71x86"
  ],
  "BOART LONGYEAR|DeltaBase 420": [
    "450x71x86"
  ],
  "BOART LONGYEAR|DeltaBase 430": [
    "450x71x86"
  ],
  "Babyack|Babyack 1": [
    "190x72x37",
    "180x72x37"
  ],
  "Babyack|Babyack 2": [
    "180x72x34"
  ],
  "Bandit|19XP": [
    "400x72.5x76"
  ],
  "Bandit|3200": [
    "300x52.5x84"
  ],
  "Baraladi|EB40": [
    "230x72x43"
  ],
  "Baraladi|FB1.02": [
    "230x72x43"
  ],
  "Baraladi|FB1.2": [
    "230x72x43"
  ],
  "Baraladi|FB102": [
    "230x72x43"
  ],
  "Baraladi|FB102B": [
    "230x72x43"
  ],
  "Baraladi|FB102EB": [
    "230x72x43"
  ],
  "Baraladi|FB203": [
    "250x72x45"
  ],
  "Baraladi|Granello": [
    "180x60x34"
  ],
  "Baraladi|Minding": [
    "108x72x37",
    "180x72x37"
  ],
  "Baratti|Scorpio": [
    "190x72x37",
    "180x72x37"
  ],
  "Barreto|1324STK": [
    "180x60x28"
  ],
  "Barreto|13STKH": [
    "180x60x28"
  ],
  "Barreto|16STKB": [
    "180x60x28"
  ],
  "Barreto|1824TK": [
    "180x72x36"
  ],
  "Barreto|2024RTK": [
    "180x72x36"
  ],
  "Barreto|2036RTK": [
    "180x72x36"
  ],
  "Barreto|2324RTK": [
    "180x72x36"
  ],
  "Bastei|SLD151D": [
    "180x72x37"
  ],
  "Belle|5070": [
    "200x72x37",
    "180x72x37"
  ],
  "Bellon Maria|Monkey": [
    "170x60x34",
    "180x60x34"
  ],
  "Benassi|M350H": [
    "180x60x35"
  ],
  "Benassi|M450H": [
    "180x60x37"
  ],
  "Benassi|M550H": [
    "180x60x37"
  ],
  "Benati|M13": [
    "230x72x43"
  ],
  "Benati|M14": [
    "230x72x43"
  ],
  "Benati|M16": [
    "230x72x45"
  ],
  "Benfra|9.01": [
    "230x72x43"
  ],
  "Benfra|9.01B": [
    "230x72x43"
  ],
  "Benfra|9.02": [
    "230x72x43"
  ],
  "Benfra|9.02B": [
    "250x72x52"
  ],
  "Benfra|9.02S": [
    "230x72x43"
  ],
  "Bentrac|M16": [
    "230x72x45"
  ],
  "Bentrac|M25": [
    "300x54x74",
    "250x52.5x76",
    "300x52.5x76"
  ],
  "Beretta|GT15": [
    "230x96x39",
    "250x48x78"
  ],
  "Beretta|GT52": [
    "250x52.5x76",
    "300x52.5x76"
  ],
  "Beretta|Skorpio2C": [
    "230x72x43"
  ],
  "Beretta|Spider": [
    "230x72x43"
  ],
  "Beretta|T 41 (Drilling Machine)": [
    "250x52.5x76",
    "300x52.5x76"
  ],
  "Beretta|T21 (Drilling Machine)": [
    "180x72x34"
  ],
  "Beretta|T25 (Drilling Machine)": [
    "200x72x36",
    "180x72x36"
  ],
  "Beretta|T41 (Drilling Machine)": [
    "230x72x43"
  ],
  "Beretta|T43 (Drilling Machine)": [
    "230x72x43"
  ],
  "Beretta|T43/2 (Drilling Machine)": [
    "250x72x52"
  ],
  "Beretta|T44 (Drilling Machine)": [
    "250x107.5x37",
    "250x52.5x76",
    "300x52.5x76"
  ],
  "Beretta|T45 (Drilling Machine)": [
    "230x72x43"
  ],
  "Beretta|T46 (Drilling Machine)": [
    "250x107.5x37",
    "250x52.5x76",
    "300x52.5x76"
  ],
  "Beretta|TD50": [
    "230x72x56"
  ],
  "Beretta|TD75": [
    "230x72x56"
  ],
  "Bergmann|Dumper": [
    "190x72x37"
  ],
  "Bertani|C75": [
    "230x72x45"
  ],
  "Bertolini|Mini-excavator": [
    "180x60x34",
    "180x60x38",
    "180x72x34"
  ],
  "Betram|Crawler Crane": [
    "400x72.5x72"
  ],
  "Bitelli|BB611C(Asphalt Finisher)": [
    "250x72x52"
  ],
  "Bluelift|Aerial Platform": [
    "230x72x43",
    "230x72x37",
    "230x96x39",
    "250x48x78"
  ],
  "Bobcat|220": [
    "230x96x33",
    "230x48x66"
  ],
  "Bobcat|316": [
    "180x72x38"
  ],
  "Bobcat|319": [
    "200x72x41"
  ],
  "Bobcat|320 (562320000 and higher)": [
    "230x96x33",
    "230x48x66"
  ],
  "Bobcat|320 (562320000 and lower)": [
    "230x72x45"
  ],
  "Bobcat|320 L": [
    "230x96x33",
    "230x48x66"
  ],
  "Bobcat|321": [
    "230x96x33",
    "230x48x66"
  ],
  "Bobcat|322": [
    "230x96x33",
    "230x48x66"
  ],
  "Bobcat|322G": [
    "230x96x33",
    "230x48x66"
  ],
  "Bobcat|323": [
    "230x96x33",
    "230x48x66"
  ],
  "Bobcat|324": [
    "230x96x33",
    "230x48x66"
  ],
  "Bobcat|325": [
    "300x52.5x74",
    "300x52.5x74"
  ],
  "Bobcat|328": [
    "320x52.5x74",
    "300x52.5x74"
  ],
  "Bobcat|328G": [
    "320x52.5x74",
    "300x52.5x74"
  ],
  "Bobcat|329": [
    "320x52.5x80",
    "320x52.5x80"
  ],
  "Bobcat|331": [
    "320x52.5x80",
    "320x52.5x80"
  ],
  "Bobcat|331D": [
    "320x52.5x80",
    "300x52.5x80"
  ],
  "Bobcat|331E": [
    "320x52.5x80",
    "300x52.5x80"
  ],
  "Bobcat|331G": [
    "320x52.5x80",
    "320x52.5x80"
  ],
  "Bobcat|334": [
    "320x52.5x80",
    "320x52.5x80"
  ],
  "Bobcat|334D": [
    "320x52.5x80",
    "300x52.5x80"
  ],
  "Bobcat|335": [
    "320x55x88",
    "300x52.5x92"
  ],
  "Bobcat|337": [
    "400x73x74",
    "400x72.5x74"
  ],
  "Bobcat|337G": [
    "400x73x74",
    "400x72.5x74"
  ],
  "Bobcat|341": [
    "400x73x74",
    "400x72.5x74"
  ],
  "Bobcat|341D": [
    "400x73x74",
    "400x72.5x74"
  ],
  "Bobcat|341G": [
    "400x73x74",
    "400x72.5x74"
  ],
  "Bobcat|418": [
    "180x72x39"
  ],
  "Bobcat|418A": [
    "180x72x39"
  ],
  "Bobcat|425": [
    "320x52.5x80",
    "300x52.5x80"
  ],
  "Bobcat|428": [
    "320x52.5x80",
    "300x52.5x80"
  ],
  "Bobcat|430D(Fast TRACK)": [
    "320x55x88",
    "300x52.5x92"
  ],
  "Bobcat|430G": [
    "320x55x88",
    "300x52.5x92"
  ],
  "Bobcat|430ZHS": [
    "320x55x88",
    "300x52.5x92"
  ],
  "Bobcat|430ZTS": [
    "320x55x88",
    "300x52.5x92"
  ],
  "Bobcat|435 (Fast TRACK)": [
    "400x73x74",
    "400x72.5x74"
  ],
  "Bobcat|442": [
    "450x71x86"
  ],
  "Bobcat|444": [
    "500x92x78"
  ],
  "Bobcat|863(VTS System for Skidsteer Loader)": [
    "450x86x56"
  ],
  "Bobcat|864": [
    "320x86x52",
    "450x86x52"
  ],
  "Bobcat|864H": [
    "450x84x53",
    "450x86x52"
  ],
  "Bobcat|873": [
    "450x86x60"
  ],
  "Bobcat|883": [
    "450x86x60"
  ],
  "Bobcat|E08": [
    "180x72x39"
  ],
  "Bobcat|E10": [
    "180x72x39"
  ],
  "Bobcat|E10Z": [
    "180x72x39"
  ],
  "Bobcat|E10e": [
    "180x72x39"
  ],
  "Bobcat|E14": [
    "200x72x41"
  ],
  "Bobcat|E16": [
    "230x48x66"
  ],
  "Bobcat|E17": [
    "230x48x66"
  ],
  "Bobcat|E17Z": [
    "230x48x66"
  ],
  "Bobcat|E19": [
    "230x48x66"
  ],
  "Bobcat|E20": [
    "230x48x72"
  ],
  "Bobcat|E20Z": [
    "230x48x72"
  ],
  "Bobcat|E26": [
    "300x52.5x80",
    "300x52.5x80"
  ],
  "Bobcat|E27": [
    "300x52.5x80",
    "300x52.5x80"
  ],
  "Bobcat|E27z": [
    "300x52.5x80",
    "300x52.5x80"
  ],
  "Bobcat|E32 [I guiding | M-series]": [
    "320x52.5x80",
    "300x52.5x80"
  ],
  "Bobcat|E32 [J guiding | R-series]": [
    "320x52.5x80",
    "300x52.5x80"
  ],
  "Bobcat|E32C": [
    "320x52.5x80",
    "300x52.5x80"
  ],
  "Bobcat|E34": [
    "300x52.5x80",
    "300x52.5x80"
  ],
  "Bobcat|E35 [I guiding | M-series]": [
    "300x52.5x84",
    "300x52.5x84"
  ],
  "Bobcat|E35I [J guiding | R-series]": [
    "300x52.5x84",
    "300x55x81"
  ],
  "Bobcat|E35M": [
    "300x52.5x84",
    "300x52.5x84"
  ],
  "Bobcat|E35Z": [
    "300x52.5x84",
    "300x52.5x84"
  ],
  "Bobcat|E41": [
    "350x55x88",
    "300x52.5x92"
  ],
  "Bobcat|E42": [
    "350x55x88",
    "300x52.5x92"
  ],
  "Bobcat|E45": [
    "400x72.5x74"
  ],
  "Bobcat|E50": [
    "400x72.5x74"
  ],
  "Bobcat|E55": [
    "400x72.5x74"
  ],
  "Bobcat|E60 [I guiding]": [
    "400x72.5x76"
  ],
  "Bobcat|E62": [
    "400x72.5x76"
  ],
  "Bobcat|E63": [
    "400x72.5x76"
  ],
  "Bobcat|E80": [
    "450x81x76"
  ],
  "Bobcat|E85": [
    "450x81x76"
  ],
  "Bobcat|MT 100": [
    "250x72x45",
    "230x72x45"
  ],
  "Bobcat|MT100": [
    "180x72x45"
  ],
  "Bobcat|MT120": [
    "180x72x45"
  ],
  "Bobcat|MT50": [
    "180x72x39"
  ],
  "Bobcat|MT52": [
    "180x72x39"
  ],
  "Bobcat|MT55": [
    "180x72x39"
  ],
  "Bobcat|MT85": [
    "180x72x45",
    "250x72x45"
  ],
  "Bobcat|S130": [
    "320x86x50",
    "400x86x50",
    "375x86x50"
  ],
  "Bobcat|S150": [
    "320x86x52",
    "400x86x52",
    "375x86x52"
  ],
  "Bobcat|S160": [
    "320x86x52",
    "400x86x52",
    "375x86x52"
  ],
  "Bobcat|S175": [
    "320x86x52",
    "400x86x52",
    "375x86x52"
  ],
  "Bobcat|S185": [
    "320x86x52",
    "400x86x52",
    "375x86x52"
  ],
  "Bobcat|S205": [
    "320x86x52",
    "400x86x52",
    "375x86x52"
  ],
  "Bobcat|S220": [
    "450x86x60"
  ],
  "Bobcat|S250": [
    "450x86x60"
  ],
  "Bobcat|S300": [
    "450x86x60"
  ],
  "Bobcat|T110": [
    "250x75x52",
    "250x72x52"
  ],
  "Bobcat|T140": [
    "300x84x46",
    "320x86x45"
  ],
  "Bobcat|T180": [
    "320x86x49",
    "400x86x49"
  ],
  "Bobcat|T180H": [
    "320x86x49"
  ],
  "Bobcat|T190": [
    "13x4x56",
    "400x86x49",
    "320x86x49"
  ],
  "Bobcat|T190H": [
    "320x86x49",
    "400x86x49"
  ],
  "Bobcat|T200": [
    "13x4x56",
    "320x86x52",
    "450x86x52"
  ],
  "Bobcat|T250": [
    "18x4x56",
    "450x86x55",
    "400x86x55"
  ],
  "Bobcat|T250H": [
    "450x86x55",
    "400x86x55"
  ],
  "Bobcat|T300": [
    "18x4x56",
    "450x86x55",
    "400x86x55"
  ],
  "Bobcat|T300H": [
    "450x86x55",
    "400x86x55"
  ],
  "Bobcat|T320": [
    "450x86x55",
    "400x86x55",
    "18x4x51"
  ],
  "Bobcat|T450": [
    "300x84x46"
  ],
  "Bobcat|T550": [
    "18x4x56",
    "400x86x49",
    "320x86x49"
  ],
  "Bobcat|T590": [
    "18x4x56",
    "400x86x49",
    "320x86x49"
  ],
  "Bobcat|T595": [
    "18x4x56",
    "400x86x49",
    "320x86x49"
  ],
  "Bobcat|T62": [
    "320x86x50",
    "400x86x50"
  ],
  "Bobcat|T630": [
    "18x4x56",
    "450x86x52",
    "400x86x52",
    "320x86x52"
  ],
  "Bobcat|T64": [
    "320x86x50",
    "400x86x50"
  ],
  "Bobcat|T650": [
    "18x4x56",
    "450x86x52",
    "400x86x52",
    "320x86x52"
  ],
  "Bobcat|T66": [
    "320x86x50",
    "400x86x50"
  ],
  "Bobcat|T72": [
    "320x86x53",
    "450x86x53",
    "400x86x53"
  ],
  "Bobcat|T740": [
    "18x4x56",
    "450x86x55"
  ],
  "Bobcat|T750": [
    "18x4x56",
    "450x86x55",
    "400x86x55"
  ],
  "Bobcat|T76": [
    "320x86x53",
    "450x86x53"
  ],
  "Bobcat|T770": [
    "18x4x56",
    "450x86x55",
    "400x86x55"
  ],
  "Bobcat|T830": [
    "450x86x58"
  ],
  "Bobcat|T86": [
    "450x86x58"
  ],
  "Bobcat|T870": [
    "450x84x59",
    "18x4x56",
    "450x86x58"
  ],
  "Bobcat|X119": [
    "230x72x43"
  ],
  "Bobcat|X120": [
    "230x72x43"
  ],
  "Bobcat|X122": [
    "230x72x43"
  ],
  "Bobcat|X123": [
    "250x72x47"
  ],
  "Bobcat|X220": [
    "250x72x45"
  ],
  "Bobcat|X225": [
    "300x52.5x74",
    "300x55x71"
  ],
  "Bobcat|X231": [
    "320x54x78",
    "300x52.5x80"
  ],
  "Bobcat|X316": [
    "180x72x38"
  ],
  "Bobcat|X320": [
    "230x72x45"
  ],
  "Bobcat|X320 (SN<<2000)": [
    "250x72x45"
  ],
  "Bobcat|X320D": [
    "230x96x33",
    "230x48x66"
  ],
  "Bobcat|X320E": [
    "230x96x33",
    "230x48x66"
  ],
  "Bobcat|X322": [
    "230x96x33",
    "230x48x66"
  ],
  "Bobcat|X322 (SN<<2000)": [
    "250x72x45"
  ],
  "Bobcat|X322D": [
    "230x96x33",
    "230x48x66"
  ],
  "Bobcat|X322E": [
    "230x96x33",
    "230x48x66"
  ],
  "Bobcat|X322G": [
    "230x96x33",
    "230x48x66"
  ],
  "Bobcat|X323": [
    "230x96x33",
    "230x48x66"
  ],
  "Bobcat|X324": [
    "230x96x33",
    "230x48x66"
  ],
  "Bobcat|X325": [
    "320x54x72",
    "300x52.5x74"
  ],
  "Bobcat|X328": [
    "320x54x72",
    "300x52.5x74"
  ],
  "Bobcat|X328E": [
    "320x54x72",
    "300x52.5x74"
  ],
  "Bobcat|X329": [
    "320x52.5x80",
    "300x52.5x80"
  ],
  "Bobcat|X331": [
    "320x54x78",
    "300x52.5x80"
  ],
  "Bobcat|X331E": [
    "320x54x78",
    "300x52.5x80"
  ],
  "Bobcat|X334": [
    "320x54x78",
    "300x52.5x80"
  ],
  "Bobcat|X334G": [
    "300x54x78",
    "300x52.5x80"
  ],
  "Bobcat|X337": [
    "400x72.5x74"
  ],
  "Bobcat|X341": [
    "400x73x74",
    "400x72.5x74"
  ],
  "Bobcat|X418": [
    "180x72x39"
  ],
  "Bobcat|X422": [
    "450x71x86"
  ],
  "Bobcat|X425": [
    "320x52.5x80",
    "300x52.5x80"
  ],
  "Bobcat|X430": [
    "300x52.5x92",
    "300x52.5x92"
  ],
  "Bobcat|X435": [
    "400x73x74",
    "400x72.5x74"
  ],
  "Bobcat|X442": [
    "450x71x86"
  ],
  "Bobcat|X442B": [
    "450x71x86"
  ],
  "Bobcat|X442ZTS": [
    "450x71x86"
  ],
  "Bobcat|X444": [
    "500x92x78"
  ],
  "Bobcat|Y12": [
    "230x72x43"
  ],
  "Bobcat|ZX125": [
    "500x92x78"
  ],
  "Bobcat|ZX75": [
    "450x71x86"
  ],
  "Bonne Esperance|B23RP": [
    "250x72x47"
  ],
  "Bonne Esperance|BE2050": [
    "250x72x52"
  ],
  "Bonne Esperance|Minisand": [
    "250x72x52"
  ],
  "Bormor|200TX": [
    "230x72x56"
  ],
  "Bormor|400TX": [
    "230x72x56"
  ],
  "Boxer|118": [
    "180x72x36"
  ],
  "Boxer|320": [
    "180x72x36"
  ],
  "Boxer|322D": [
    "180x72x36"
  ],
  "Boxer|427": [
    "230x72x39"
  ],
  "Boxer|526DX": [
    "230x72x39"
  ],
  "Boxer|530DX": [
    "230x72x39"
  ],
  "Boxer|532DX": [
    "230x72x39"
  ],
  "Boxer|600HD": [
    "180x72x39"
  ],
  "Boxer|700HDX": [
    "230x72x39"
  ],
  "Boxer|Brute TRX": [
    "230x72x39"
  ],
  "Boxer|TL 224": [
    "180x72x34"
  ],
  "Brokk|100": [
    "180x72x36",
    "200x72x36"
  ],
  "Brokk|110": [
    "180x72x36"
  ],
  "Brokk|120D": [
    "180x72x39"
  ],
  "Brokk|150": [
    "200x72x36",
    "180x72x36"
  ],
  "Brokk|160": [
    "230x72x42"
  ],
  "Brokk|180": [
    "230x72x42"
  ],
  "Brokk|180 <<2004": [
    "230x72x56"
  ],
  "Brokk|180 >>2005": [
    "230x72x42"
  ],
  "Brokk|260": [
    "300x55x72",
    "300x52.5x74"
  ],
  "Brokk|280": [
    "300x55x72",
    "300x52.5x74"
  ],
  "Brokk|300": [
    "300x52.5x78",
    "300x52.5x78"
  ],
  "Brokk|330": [
    "300x55x78",
    "300x25.5x80"
  ],
  "Brokk|40": [
    "130x72x29"
  ],
  "Brokk|400": [
    "300x55x78",
    "300x52.5x80"
  ],
  "Brokk|50": [
    "130x72x29"
  ],
  "Brokk|60": [
    "130x72x29"
  ],
  "Brokk|90": [
    "180x72x36"
  ],
  "Brokk|Aquacutter": [
    "250x72x52"
  ],
  "Brokk|BM 110": [
    "200x72x36",
    "180x72x36"
  ],
  "Brokk|BM 150": [
    "200x72x36",
    "180x72x36"
  ],
  "Brokk|BM 150C": [
    "200x72x36",
    "180x72x36"
  ],
  "Brokk|BM 150P": [
    "200x72x36",
    "180x72x36"
  ],
  "Brokk|K330": [
    "250x96x41",
    "250x47x84",
    "250x48x82"
  ],
  "C & F|T 50": [
    "180x72x34"
  ],
  "C & F|T 85": [
    "180x72x34"
  ],
  "CARAVAGGI|Bio235": [
    "230x72x43"
  ],
  "CASE|15": [
    "230x96x31",
    "230x48x62"
  ],
  "CASE|15 Maxi (rental)": [
    "230x96x31",
    "230x48x62"
  ],
  "CASE|16": [
    "230x96x31",
    "230x48x62"
  ],
  "CASE|16 Maxi": [
    "230x96x31",
    "230x48x62"
  ],
  "CASE|16 RTN": [
    "230x96x31",
    "230x48x62"
  ],
  "CASE|17 RTN Maxi": [
    "230x96x31",
    "230x48x62"
  ],
  "CASE|1854C": [
    "320x86x52",
    "375x86x52",
    "400x86x52"
  ],
  "CASE|23": [
    "250x109x35",
    "300x52.5x72"
  ],
  "CASE|23 Maxi": [
    "250x109x35",
    "300x52.5x72"
  ],
  "CASE|28": [
    "300x109x38",
    "300x52.5x78"
  ],
  "CASE|28 Maxi": [
    "300x109x38",
    "300x52.5x78"
  ],
  "CASE|31": [
    "300x109x40",
    "300x52.5x82"
  ],
  "CASE|31 Maxi": [
    "300x109x40",
    "300x52.5x82"
  ],
  "CASE|35": [
    "350x108x42",
    "350x52.5x86"
  ],
  "CASE|35 Maxi": [
    "350x108x42",
    "350x52.5x86"
  ],
  "CASE|35 STB": [
    "350x108x42",
    "350x52.5x86"
  ],
  "CASE|40XT": [
    "320x86x54",
    "375x86x54",
    "400x86x54"
  ],
  "CASE|410": [
    "320x86x54",
    "375x86x54",
    "400x86x54"
  ],
  "CASE|420": [
    "320x86x54",
    "375x86x54",
    "400x86x54"
  ],
  "CASE|420CT": [
    "320x86x50"
  ],
  "CASE|430": [
    "450x86x56"
  ],
  "CASE|435": [
    "450x86x58"
  ],
  "CASE|440": [
    "320x86x54",
    "375x86x54",
    "450x86x56"
  ],
  "CASE|440CT": [
    "400x86x50"
  ],
  "CASE|445": [
    "450x86x58"
  ],
  "CASE|445CT": [
    "400x86x55",
    "450x86x55"
  ],
  "CASE|450": [
    "450x86x58"
  ],
  "CASE|450CT": [
    "400x86x55",
    "450x86x55"
  ],
  "CASE|465": [
    "450x86x60"
  ],
  "CASE|50": [
    "400x72.5x72",
    "400x72.5x72"
  ],
  "CASE|50 Maxi": [
    "400x72.5x72",
    "400x72.5x72"
  ],
  "CASE|50 RTB": [
    "400x72.5x72",
    "400x72.5x72"
  ],
  "CASE|6010 Turbo": [
    "230x72x56"
  ],
  "CASE|6030 Turbo": [
    "400x135x39",
    "400x725.5x74"
  ],
  "CASE|6060 Turbo": [
    "400x73x74",
    "400x72.5x74"
  ],
  "CASE|60XT": [
    "320x86x54",
    "375x86x54",
    "450x86x56"
  ],
  "CASE|70XT": [
    "320x86x54",
    "375x86x54",
    "450x86x56"
  ],
  "CASE|75XT": [
    "450x86x58"
  ],
  "CASE|85XT": [
    "450x86x58"
  ],
  "CASE|9007 Alliance": [
    "450x73.5x80",
    "450x135x42",
    "450x71x82"
  ],
  "CASE|90XT": [
    "450x86x58"
  ],
  "CASE|95XT": [
    "450x86x60"
  ],
  "CASE|CK08": [
    "180x72x36"
  ],
  "CASE|CK13": [
    "200x96x30",
    "230x48x60"
  ],
  "CASE|CK15": [
    "200x96x30",
    "230x48x60"
  ],
  "CASE|CK16": [
    "230x96x31",
    "230x48x62"
  ],
  "CASE|CK23": [
    "260x109x35",
    "300x52.5x72"
  ],
  "CASE|CK25": [
    "300x109x35",
    "300x52.5x72"
  ],
  "CASE|CK28": [
    "300x109x35",
    "300x52.5x72"
  ],
  "CASE|CK28 (1997)": [
    "300x109x38",
    "300x52.5x78"
  ],
  "CASE|CK31": [
    "300x109x40",
    "300x52.5x82"
  ],
  "CASE|CK32": [
    "300x109x39",
    "300x52.5x80"
  ],
  "CASE|CK35": [
    "350x108x42",
    "350x52.5x86"
  ],
  "CASE|CK36": [
    "300x109x41",
    "300x52.5x84"
  ],
  "CASE|CK38": [
    "350x56x84",
    "350x52.5x88"
  ],
  "CASE|CK50": [
    "400x73x72",
    "400x72.5x72"
  ],
  "CASE|CK52": [
    "400x72.5x72",
    "400x72.5x72"
  ],
  "CASE|CX 26C": [
    "250x52.5x78"
  ],
  "CASE|CX 27B": [
    "250x52.5x80",
    "300x52.5x80"
  ],
  "CASE|CX 27BMC": [
    "250x52.5x80",
    "300x52.5x80"
  ],
  "CASE|CX 27BMR": [
    "250x52.5x80",
    "300x52.5x80"
  ],
  "CASE|CX 27BZTS": [
    "250x52.5x80",
    "300x52.5x80"
  ],
  "CASE|CX 28": [
    "300x109x38",
    "300x52.5x78"
  ],
  "CASE|CX 30B": [
    "250x52.5x80",
    "300x52.5x80"
  ],
  "CASE|CX 30C": [
    "300x52.5x80",
    "300x52.5x80"
  ],
  "CASE|CX 31": [
    "300x109x40",
    "300x52.5x82"
  ],
  "CASE|CX 31B": [
    "300x52.5x82",
    "300x52.5x88"
  ],
  "CASE|CX 31BMC": [
    "300x52.5x82"
  ],
  "CASE|CX 31BMR": [
    "300x52.5x82"
  ],
  "CASE|CX 33C": [
    "300x52.5x86"
  ],
  "CASE|CX 35": [
    "300x52.5x86"
  ],
  "CASE|CX 35B": [
    "300x52.5x82"
  ],
  "CASE|CX 36": [
    "300x52.5x88"
  ],
  "CASE|CX 36BMC[I guiding]": [
    "300x52.5x88",
    "300x52.5x88"
  ],
  "CASE|CX 36BMC[J guiding]": [
    "300x52.5x88",
    "300x52.5x88"
  ],
  "CASE|CX 36BMR[I guiding]": [
    "300x52.5x88",
    "300x52.5x88"
  ],
  "CASE|CX 36BMR[J guiding]": [
    "300x52.5x88"
  ],
  "CASE|CX 36BZTS[I guiding]": [
    "300x52.5x88",
    "300x52.5x88"
  ],
  "CASE|CX 36BZTS[J guiding]": [
    "300x52.5x88",
    "300x52x588"
  ],
  "CASE|CX 36B[I guiding]": [
    "300x52.5x88",
    "300x52.5x88"
  ],
  "CASE|CX 36B[J guiding]": [
    "300x52.5x88"
  ],
  "CASE|CX 37C": [
    "300x52.5x86"
  ],
  "CASE|CX 39B": [
    "300x52.5x88",
    "300x52.5x88"
  ],
  "CASE|CX 40B": [
    "400x74x68",
    "400x72.5x70"
  ],
  "CASE|CX 40BMC": [
    "400x74x68",
    "400x72.5x70"
  ],
  "CASE|CX 40BMR": [
    "400x74x68",
    "400x72.5x70"
  ],
  "CASE|CX 45B": [
    "400x74x68",
    "400x72.5x70"
  ],
  "CASE|CX 47": [
    "400x74x72",
    "400x72.5x73"
  ],
  "CASE|CX 50": [
    "400x74x72",
    "400x72.5x73"
  ],
  "CASE|CX 50B": [
    "400x74x72",
    "400x72.5x73"
  ],
  "CASE|CX 50BMC": [
    "400x74x72",
    "400x72.5x73"
  ],
  "CASE|CX 50BMR": [
    "400x74x72",
    "400x72.5x73"
  ],
  "CASE|CX 50BZTS": [
    "400x74x72",
    "400x72.5x73"
  ],
  "CASE|CX 55B": [
    "400x72.5x74"
  ],
  "CASE|CX 57C": [
    "400x73x76",
    "400x72.5x76"
  ],
  "CASE|CX 60C": [
    "400x73x76",
    "400x72.5x76"
  ],
  "CASE|CX 75SR": [
    "450x81x76",
    "450x81x76"
  ],
  "CASE|CX 80": [
    "450x81x76",
    "450x81x76"
  ],
  "CASE|CX 80C": [
    "450x81x76",
    "450x81x76"
  ],
  "CASE|CX 90D": [
    "450x81.5x76",
    "450x81x76"
  ],
  "CASE|CX14": [
    "230x48x70"
  ],
  "CASE|CX14ZTS": [
    "230x48x70"
  ],
  "CASE|CX15": [
    "230x96x31",
    "230x48x62"
  ],
  "CASE|CX15STC": [
    "230x48x70"
  ],
  "CASE|CX15STR": [
    "230x48x70"
  ],
  "CASE|CX16(2001)": [
    "230x96x31",
    "230x48x62"
  ],
  "CASE|CX16B": [
    "230x48x70"
  ],
  "CASE|CX16SVC": [
    "230x48x70"
  ],
  "CASE|CX16SVR": [
    "230x48x70"
  ],
  "CASE|CX17BZTS": [
    "230x48x70"
  ],
  "CASE|CX17C": [
    "230x48x70"
  ],
  "CASE|CX18B": [
    "230x48x70"
  ],
  "CASE|CX18C": [
    "230x48x70"
  ],
  "CASE|CX20 BMR": [
    "250x52.5x76",
    "300x52.5x76"
  ],
  "CASE|CX20B": [
    "250x52.5x76",
    "300x52.5x76"
  ],
  "CASE|CX22 B": [
    "250x52.5x76",
    "300x52.5x76"
  ],
  "CASE|CX22 BMC": [
    "250x52.5x76",
    "300x52.5x76"
  ],
  "CASE|CX22 BZTS": [
    "250x52.5x76",
    "300x52.5x76"
  ],
  "CASE|CX23": [
    "250x109x35",
    "300x52.5x72"
  ],
  "CASE|CX25": [
    "250x52.5x76",
    "300x52.5x76"
  ],
  "CASE|CX26 BZTS": [
    "250x52.5x76",
    "300x52.5x76"
  ],
  "CASE|CX26B": [
    "250x52.5x76",
    "300x52.5x76"
  ],
  "CASE|LX 92": [
    "230x96x30",
    "230x48x60"
  ],
  "CASE|TF 300": [
    "230x72x39",
    "250x72x39"
  ],
  "CASE|TF 300RT": [
    "250x72x39"
  ],
  "CASE|TR270": [
    "320x86x50"
  ],
  "CASE|TR310": [
    "400x86x50"
  ],
  "CASE|TR320": [
    "450x86x55"
  ],
  "CASE|TR340": [
    "450x86x55"
  ],
  "CASE|TV370": [
    "450x86x55"
  ],
  "CASE|TV370B": [
    "450x86x55"
  ],
  "CASE|TV380": [
    "450x86x55"
  ],
  "CASE|TV450B": [
    "450x86x55"
  ],
  "CASE|TV620B": [
    "450x86x53"
  ],
  "CAT|216": [
    "320x86x52",
    "375x86x52",
    "400x86x52"
  ],
  "CAT|226": [
    "320x86x52",
    "375x86x52",
    "400x86x52"
  ],
  "CAT|228": [
    "320x86x52",
    "375x86x52",
    "400x86x52"
  ],
  "CAT|232": [
    "320x86x54",
    "375x86x54",
    "400x86x54"
  ],
  "CAT|236": [
    "320x86x56",
    "375x86x56",
    "450x86x56"
  ],
  "CAT|239D": [
    "320x86x49"
  ],
  "CAT|239D3": [
    "320x86x49"
  ],
  "CAT|242": [
    "320x86x54",
    "375x86x54",
    "400x86x54"
  ],
  "CAT|246": [
    "320x86x56",
    "375x86x56",
    "450x86x56"
  ],
  "CAT|246C": [
    "450x86x60"
  ],
  "CAT|247": [
    "381x100x42"
  ],
  "CAT|247A": [
    "381x100x42"
  ],
  "CAT|247B": [
    "381x100x42"
  ],
  "CAT|247B2": [
    "381x100x42"
  ],
  "CAT|247B3": [
    "381x100x42"
  ],
  "CAT|248": [
    "320x86x56",
    "375x86x56",
    "450x86x56"
  ],
  "CAT|249D": [
    "320x86x49",
    "400x86x49"
  ],
  "CAT|249D3": [
    "320x86x49",
    "400x86x49"
  ],
  "CAT|256C": [
    "450x86x60"
  ],
  "CAT|257": [
    "381x100x42"
  ],
  "CAT|257A": [
    "381x100x42"
  ],
  "CAT|257B": [
    "381x100x42"
  ],
  "CAT|257B2": [
    "381x100x42"
  ],
  "CAT|257B3": [
    "381x100x42"
  ],
  "CAT|257D": [
    "381x100x42"
  ],
  "CAT|257D3": [
    "381x100x42"
  ],
  "CAT|259": [
    "320x86x53"
  ],
  "CAT|259B": [
    "320x86x53"
  ],
  "CAT|259B3": [
    "320x86x53"
  ],
  "CAT|259C": [
    "320x86x53"
  ],
  "CAT|259D": [
    "320x86x53"
  ],
  "CAT|259D3": [
    "320x86x53"
  ],
  "CAT|262C": [
    "450x86x60"
  ],
  "CAT|267": [
    "457x100.6x56"
  ],
  "CAT|267A": [
    "457x100.6x56"
  ],
  "CAT|267B": [
    "457x100.6x56"
  ],
  "CAT|267B2": [
    "15x4x56"
  ],
  "CAT|269C": [
    "450x86x60",
    "15x4x56",
    "40x86x60"
  ],
  "CAT|269D": [
    "15x4x56"
  ],
  "CAT|269D3": [
    "15x4x56"
  ],
  "CAT|272C": [
    "450x86x63"
  ],
  "CAT|277": [
    "457x100.6x56"
  ],
  "CAT|277A": [
    "457x100.6x56"
  ],
  "CAT|277B": [
    "457x100.6x56"
  ],
  "CAT|277C": [
    "457x100.6x51"
  ],
  "CAT|277C2": [
    "457x100.6x51"
  ],
  "CAT|277D": [
    "457x100.6x51"
  ],
  "CAT|279C": [
    "400x86x56",
    "450x86x60"
  ],
  "CAT|279C2": [
    "400x86x56",
    "450x86x60"
  ],
  "CAT|279D": [
    "400x86x56",
    "450x86x60"
  ],
  "CAT|279D2": [
    "400x86x56",
    "450x86x60"
  ],
  "CAT|279D3": [
    "400x86x56",
    "450x86x60"
  ],
  "CAT|287": [
    "457x100x51"
  ],
  "CAT|287A": [
    "457x100x51"
  ],
  "CAT|287B": [
    "457x100x51"
  ],
  "CAT|287C": [
    "457x100x51"
  ],
  "CAT|287C2": [
    "18x4x56"
  ],
  "CAT|287D": [
    "457x100x51"
  ],
  "CAT|289C": [
    "400x86x56",
    "450x86x60"
  ],
  "CAT|289C2": [
    "400x86x56",
    "450x86x60"
  ],
  "CAT|289D": [
    "400x86x56",
    "450x86x60"
  ],
  "CAT|289D2": [
    "400x86x56",
    "450x86x60"
  ],
  "CAT|289D3": [
    "400x86x56",
    "450x86x60"
  ],
  "CAT|297C": [
    "457x100x51"
  ],
  "CAT|297D": [
    "457x100x51"
  ],
  "CAT|297D2": [
    "457x100x51"
  ],
  "CAT|297D2 XHP": [
    "457x100x51"
  ],
  "CAT|297D2XHP": [
    "18x4x56"
  ],
  "CAT|299C": [
    "450x86x60",
    "400x86x60"
  ],
  "CAT|299C2": [
    "450x86x60",
    "400x86x60"
  ],
  "CAT|299D": [
    "450x86x60",
    "400x86x60"
  ],
  "CAT|299D XHP": [
    "400x86x60",
    "450x86x60"
  ],
  "CAT|299D2": [
    "450x86x60",
    "400x86x60"
  ],
  "CAT|299D2 XHP": [
    "400x86x60",
    "450x86x60"
  ],
  "CAT|299D2XHP": [
    "18x4x51"
  ],
  "CAT|299D3": [
    "450x86x60",
    "400x86x60"
  ],
  "CAT|299D3XE": [
    "450x86x60",
    "400x86x60"
  ],
  "CAT|300.9D": [
    "180x72x37"
  ],
  "CAT|301.4C": [
    "230x96x33",
    "230x48x66"
  ],
  "CAT|301.5": [
    "230x48x62"
  ],
  "CAT|301.5CR": [
    "230x48x70"
  ],
  "CAT|301.6": [
    "230x48x66",
    "230x96x33"
  ],
  "CAT|301.6C": [
    "230x48x70"
  ],
  "CAT|301.7CR": [
    "230x48x70"
  ],
  "CAT|301.7D": [
    "230x96x36",
    "230x48x72"
  ],
  "CAT|301.7DCR": [
    "230x96x36",
    "230x48x72"
  ],
  "CAT|301.8": [
    "230x48x66",
    "230x96x33"
  ],
  "CAT|301.8C": [
    "230x48x70"
  ],
  "CAT|301.8CR": [
    "230x48x70"
  ],
  "CAT|302.2D": [
    "250x96x38",
    "250x48x76"
  ],
  "CAT|302.5": [
    "300x52.5x78"
  ],
  "CAT|302.5C": [
    "300x55x74",
    "300x52.5x78"
  ],
  "CAT|302.7DCR": [
    "300x52.5x82"
  ],
  "CAT|302CR": [
    "250x48x82",
    "250x47x84"
  ],
  "CAT|303.5": [
    "300x52.5x84"
  ],
  "CAT|303.5CCR": [
    "300x52.5x90"
  ],
  "CAT|303.5DCR": [
    "300x52.5x90"
  ],
  "CAT|303.5E2CR": [
    "300x52.5x90"
  ],
  "CAT|303.5ECR": [
    "300x52.5x90"
  ],
  "CAT|303CCR": [
    "300x52.5x90"
  ],
  "CAT|303CR": [
    "300x52.5x84"
  ],
  "CAT|303CR 2007": [
    "300x52.5x90"
  ],
  "CAT|303ECR": [
    "300x52.5x84"
  ],
  "CAT|304.5": [
    "400x73x72",
    "400x72.5x72"
  ],
  "CAT|304.5E2XTC": [
    "350x52.5x90"
  ],
  "CAT|304C": [
    "400x72.5x72"
  ],
  "CAT|304CCR": [
    "400x72.5x76"
  ],
  "CAT|304CR": [
    "400x73x72",
    "400x72.5x72"
  ],
  "CAT|304DCR": [
    "350x52.5x90"
  ],
  "CAT|304E2CR": [
    "350x52.5x90"
  ],
  "CAT|304ECR": [
    "350x52.5x90"
  ],
  "CAT|305.5DCR": [
    "400x72.5x76"
  ],
  "CAT|305.5E2CR": [
    "400x72.5x76"
  ],
  "CAT|305.5ECR": [
    "400x72.5x76"
  ],
  "CAT|305CCR": [
    "400x72.5x76"
  ],
  "CAT|306CR": [
    "400x72.5x76"
  ],
  "CAT|307": [
    "450x71x82"
  ],
  "CAT|307A (Japan E70B)": [
    "450x71x82"
  ],
  "CAT|307B": [
    "450x71x82"
  ],
  "CAT|307C": [
    "450x71x82"
  ],
  "CAT|307CAC": [
    "450x71x82"
  ],
  "CAT|307CCC": [
    "450x71x82"
  ],
  "CAT|307CSB": [
    "450x71x82"
  ],
  "CAT|307HD": [
    "450x71x84"
  ],
  "CAT|307SSR": [
    "450x71x82"
  ],
  "CAT|308": [
    "450x71x86"
  ],
  "CAT|308BSR": [
    "450x71x86"
  ],
  "CAT|308CCR": [
    "450x81x78",
    "450x81x78"
  ],
  "CAT|308CSR": [
    "450x81x78",
    "450x81x78"
  ],
  "CAT|308DCRSB": [
    "450x81x78",
    "450x81x78"
  ],
  "CAT|308E2CR": [
    "450x81x78",
    "450x81x78"
  ],
  "CAT|308ECRSB": [
    "450x81x78",
    "450x81x78"
  ],
  "CAT|311B": [
    "500x92x78"
  ],
  "CAT|311BSR": [
    "500x92x78"
  ],
  "CAT|311C Utility": [
    "500x92x78"
  ],
  "CAT|E110B": [
    "500x92x78"
  ],
  "CAT|E70": [
    "450x71x82"
  ],
  "CAT|E70B": [
    "450x71x82"
  ],
  "CAT|ME08": [
    "180x72x36"
  ],
  "CAT|ME08B": [
    "180x72x36"
  ],
  "CAT|ME15": [
    "230x96x33",
    "230x48x66"
  ],
  "CAT|ME20": [
    "300x109x36",
    "300x52.5x74"
  ],
  "CAT|ME25": [
    "300x109x36",
    "300x52.5x74"
  ],
  "CAT|ME30": [
    "300x52.5x80",
    "300x52.5x80"
  ],
  "CAT|ME30B": [
    "300x52.5x80",
    "300x52.5x80"
  ],
  "CAT|ME30T": [
    "300x52.5x80",
    "300x52.5x80"
  ],
  "CAT|ME35": [
    "300x52.5x80",
    "300x52.5x80"
  ],
  "CAT|ME40": [
    "400x146x35",
    "400x72.5x70"
  ],
  "CAT|ME40R": [
    "400x146x35",
    "400x72.5x70"
  ],
  "CAT|ME45": [
    "400x146x35",
    "400x72.5x70"
  ],
  "CAT|MH15": [
    "230x96x33",
    "230x48x66"
  ],
  "CAT|MM08B": [
    "180x72x36"
  ],
  "CAT|MM15": [
    "230x96x33",
    "230x48x66",
    "230x96x31",
    "230x48x62"
  ],
  "CAT|MM15-7": [
    "230x96x31",
    "230x48x62"
  ],
  "CAT|MM15T": [
    "230x96x31",
    "230x48x62"
  ],
  "CAT|MM20": [
    "260x52.5x74",
    "300x52.5x74"
  ],
  "CAT|MM20CR (Corner Rad)": [
    "260x52.5x74",
    "300x52.5x74"
  ],
  "CAT|MM20SR (short Rad)": [
    "260x52.5x74",
    "300x52.5x74"
  ],
  "CAT|MM20T": [
    "260x52.5x74",
    "300x52.5x74"
  ],
  "CAT|MM25": [
    "300x52.5x76",
    "300x52.5x72"
  ],
  "CAT|MM25T": [
    "300x52.5x78"
  ],
  "CAT|MM30": [
    "300x52.5x80"
  ],
  "CAT|MM30B": [
    "300x52.5x80"
  ],
  "CAT|MM30CR": [
    "300x52.5x80"
  ],
  "CAT|MM30CR-2 (corner rad)": [
    "300x52.5x80"
  ],
  "CAT|MM30SR (short rad)": [
    "300x52.5x80"
  ],
  "CAT|MM30T": [
    "300x52.5x80"
  ],
  "CAT|MM35": [
    "300x52.5x84"
  ],
  "CAT|MM35B": [
    "300x52.5x84"
  ],
  "CAT|MM35T": [
    "300x52.5x84"
  ],
  "CAT|MM40B": [
    "400x73x72",
    "400x72.5x72"
  ],
  "CAT|MM40CR": [
    "400x73x72",
    "400x72.5x72"
  ],
  "CAT|MM40CR-2 (corner rad)": [
    "400x73x72",
    "400x72.5x72"
  ],
  "CAT|MM40SR (short rad)": [
    "400x73x72",
    "400x72.5x72"
  ],
  "CAT|MM40SR-2 (short rad)": [
    "400x73x72",
    "400x72.5x72"
  ],
  "CAT|MM40T": [
    "400x146x36",
    "400x72.5x72"
  ],
  "CAT|MM45": [
    "400x146x36",
    "400x72.5x72"
  ],
  "CAT|MM45B": [
    "400x146x36",
    "400x72.5x72"
  ],
  "CAT|MM45T": [
    "400x146x36",
    "400x72.5x72"
  ],
  "CAT|MM55SR": [
    "400x73x72",
    "400x72.5x72"
  ],
  "CAT|MM57SR (short rad)": [
    "400x73x72",
    "400x72.5x72"
  ],
  "CAT|MMCR": [
    "260x52.5x74",
    "300x52.5x74"
  ],
  "CAT|MS010": [
    "250x72x45"
  ],
  "CAT|MX35": [
    "300x109x39",
    "300x52.5x80",
    "300x52.5x84"
  ],
  "CAT|MX45": [
    "400x73x70",
    "400x72.5x70"
  ],
  "CEASER|ES150-3": [
    "230x48x66",
    "230x96x33"
  ],
  "CEASER|ES180-3": [
    "230x48x66",
    "230x96x33"
  ],
  "CEASER|ES300": [
    "300x52.5x74",
    "300x52.5x74"
  ],
  "CEASER|ES400": [
    "300x55x82",
    "300x52.5x84"
  ],
  "CEASER|ES400ZT": [
    "300x52.5x84",
    "300x52.5x84"
  ],
  "CEASER|ES500": [
    "400x72.5x72"
  ],
  "CEASER|ES800": [
    "450x71x86"
  ],
  "CEASER|ES800TR": [
    "450x71x86"
  ],
  "CELA|Spider 120": [
    "190x72x37",
    "180x72x37"
  ],
  "CELA|Spider 260": [
    "250x72x57"
  ],
  "CELA|Spider 560": [
    "320x100x52"
  ],
  "CELA|TELJ28": [
    "230x72x43"
  ],
  "CFC|BabyTapiro": [
    "180x60x30"
  ],
  "CFC|MaxiSpeed": [
    "250x72x45"
  ],
  "CFC|Speed 1800": [
    "250x72x45"
  ],
  "CFC|SpeedTapiro Old": [
    "200x72x40"
  ],
  "CFC|SpeedTaripo Carro Standard": [
    "180x72x34"
  ],
  "CFC|SpeedTaripo Carro Standard 2": [
    "180x72x40"
  ],
  "CFC|SpeedTaripo NuovoCarro2013": [
    "230x72x43"
  ],
  "CMC|S15": [
    "180x72x37"
  ],
  "CMC|S19": [
    "180x72x43",
    "250x72x42"
  ],
  "CMC|S24": [
    "250x72x2",
    "250x72x52"
  ],
  "CME|M12": [
    "230x72x43"
  ],
  "CME|M15": [
    "230x72x43"
  ],
  "Cameca|Baby": [
    "200x72x37",
    "180x72x37"
  ],
  "Camisa|280": [
    "180x60x35"
  ],
  "Camisa|380": [
    "180x60x35"
  ],
  "Camisa|480H": [
    "180x60x38"
  ],
  "Camisa|580": [
    "180x72x34"
  ],
  "Camisa|680": [
    "200x72x40"
  ],
  "Camisa|TR635": [
    "230x72x47"
  ],
  "Cams Libra|214": [
    "300x55x72",
    "300x52.5x74"
  ],
  "Cams Libra|216S": [
    "230x72x45"
  ],
  "Cams Libra|218SV": [
    "230x48x70"
  ],
  "Cams Libra|219RSV": [
    "230x72x45",
    "230x96x35",
    "230x48x70"
  ],
  "Cams Libra|224S": [
    "300x52.5x74",
    "300x52.5x74"
  ],
  "Cams Libra|229S": [
    "300x55x78",
    "300x52.5x80"
  ],
  "Cams Libra|234S": [
    "300x55x78",
    "300x52.5x80"
  ],
  "Cams Libra|254ST": [
    "400x72.5x72"
  ],
  "Cams Libra|865": [
    "320x86x48"
  ],
  "Cams Libra|CZ25": [
    "300x52.5x80",
    "300x52.5x80"
  ],
  "Cams Libra|CZ30": [
    "300x52.5x80",
    "300x52.5x80"
  ],
  "Cams Libra|CZ37": [
    "300x52.5x80",
    "300x52.5x80"
  ],
  "Cams Libra|CZ50": [
    "400x72.5x72"
  ],
  "Cams Libra|CZ54": [
    "400x72.5x72"
  ],
  "Cams Libra|CZ55": [
    "400x72.5x76"
  ],
  "Cams Libra|T865": [
    "320x86x48"
  ],
  "Cams Libra|T985": [
    "450x86x52"
  ],
  "Carlton|SP5014TRX": [
    "180x72x36"
  ],
  "Carlton|SP7015TRX": [
    "230x96x42"
  ],
  "Carlton|SP8018TRX<2009": [
    "230x72x56"
  ],
  "Carmix|K413": [
    "230x72x43"
  ],
  "Carmix|K414": [
    "230x72x43"
  ],
  "Carmix|K415": [
    "230x72x43"
  ],
  "Carrier|1200": [
    "200x72x42"
  ],
  "Carrier|1700X": [
    "200x72x42"
  ],
  "Casorzo|MTR450": [
    "180x72x32"
  ],
  "Casorzo|MTR600": [
    "180x72x34"
  ],
  "Celli|ECOSTAR-SC600": [
    "320x100x43"
  ],
  "Chieftan|10": [
    "230x72x43"
  ],
  "Chieftan|10F": [
    "230x72x43"
  ],
  "Chieftan|10G": [
    "230x72x43"
  ],
  "Chieftan|10S": [
    "230x72x43"
  ],
  "Chieftan|12": [
    "230x72x43"
  ],
  "Chieftan|12G": [
    "230x72x43"
  ],
  "Chieftan|IS7FX": [
    "180x72x37"
  ],
  "Chikusui/Canycom|BFG1005(Mini Transporter)": [
    "230x72x47",
    "250x72x52"
  ],
  "Chikusui/Canycom|BFG1301": [
    "280x72x48",
    "250x72x48"
  ],
  "Chikusui/Canycom|BFG1301 (Mini Transporter)": [
    "280x72x48",
    "250x72x48"
  ],
  "Chikusui/Canycom|BFG1302 (Mini Transporter)": [
    "280x72x48",
    "250x72x48"
  ],
  "Chikusui/Canycom|BFG1303 (Mini Transporter)": [
    "280x72x48",
    "250x72x48"
  ],
  "Chikusui/Canycom|BFK703 (Mini Transporter)": [
    "180x72x34"
  ],
  "Chikusui/Canycom|BFK709 (Mini Transporter)": [
    "180x72x34",
    "200x72x34"
  ],
  "Chikusui/Canycom|BFK808 (Mini Transporter)": [
    "230x72x42"
  ],
  "Chikusui/Canycom|BFP402": [
    "180x60x34"
  ],
  "Chikusui/Canycom|BFP402 (Mini Transporter)": [
    "180x60x34"
  ],
  "Chikusui/Canycom|BFP405": [
    "180x60x34"
  ],
  "Chikusui/Canycom|BFP405 (Mini Transporter)": [
    "180x72x31"
  ],
  "Chikusui/Canycom|BFP501": [
    "180x60x37"
  ],
  "Chikusui/Canycom|BFP602": [
    "180x60x37"
  ],
  "Chikusui/Canycom|BFP602 (Mini Transporter)": [
    "180x60x37"
  ],
  "Chikusui/Canycom|BFP703 (Mini Transporter)": [
    "180x72x34"
  ],
  "Chikusui/Canycom|BFS901G (Mini Transporter)": [
    "200x72x42"
  ],
  "Chikusui/Canycom|BFS901Q (Mini Transporter)": [
    "200x72x42"
  ],
  "Chikusui/Canycom|BFX703(Mini Transporter)": [
    "180x72x34"
  ],
  "Chikusui/Canycom|BFY901 (Mini Transporter)": [
    "230x72x42"
  ],
  "Chikusui/Canycom|CC1000 (Mini Transporter)": [
    "230x72x48"
  ],
  "Chikusui/Canycom|CC1300 (Mini Transporter)": [
    "280x72x48",
    "250x72x48"
  ],
  "Chikusui/Canycom|CC1500 (Mini Transporter)": [
    "280x72x48",
    "250x72x48"
  ],
  "Chikusui/Canycom|CC300 (Mini Transporter)": [
    "230x72x43"
  ],
  "Chikusui/Canycom|CC316 (Mini Transporter)": [
    "180x72x31"
  ],
  "Chikusui/Canycom|CC350 (Mini Transporter)": [
    "180x60x34"
  ],
  "Chikusui/Canycom|CC450 (Mini Transporter)": [
    "180x60x37"
  ],
  "Chikusui/Canycom|CC500 (Mini Transporter)": [
    "180x72x34"
  ],
  "Chikusui/Canycom|CC600 (Mini Transporter)": [
    "180x72x34"
  ],
  "Chikusui/Canycom|CC700 (Mini Transporter)": [
    "200x72x42"
  ],
  "Chikusui/Canycom|CC800 (Mini Transporter)": [
    "230x72x42",
    "250x72x43"
  ],
  "Chikusui/Canycom|D50": [
    "200x72x34",
    "180x72x34"
  ],
  "Chikusui/Canycom|DF 407": [
    "180x72x31"
  ],
  "Chikusui/Canycom|GC 403 (Mini Transporter)": [
    "180x72x34",
    "230x72x43"
  ],
  "Chikusui/Canycom|GC 41 (Mini Transporter)": [
    "200x72x39"
  ],
  "Chikusui/Canycom|GC 42 (Mini Transporter)": [
    "200x72x39"
  ],
  "Chikusui/Canycom|GC 50 (Mini Transporter)": [
    "200x72x43"
  ],
  "Chikusui/Canycom|GC 640 (Mini Transporter)": [
    "250x72x44",
    "250x72x55"
  ],
  "Chikusui/Canycom|GG 403(Mini Transporter)": [
    "180x72x34"
  ],
  "Chikusui/Canycom|HUKI 130 (Mini Transporter)": [
    "280x72x48",
    "250x72x48"
  ],
  "Chikusui/Canycom|HUKI 150 (Mini Transporter)": [
    "200x72x43"
  ],
  "Chikusui/Canycom|S100": [
    "250x72x48"
  ],
  "Chikusui/Canycom|SC75": [
    "200x72x42"
  ],
  "Collina|320L Tractor": [
    "180x60x30"
  ],
  "Collina|Junior 200": [
    "180x60x30"
  ],
  "Collina|S100": [
    "180x60x30"
  ],
  "Collina|SC": [
    "180x60x30"
  ],
  "Collina|Sardegna": [
    "180x60x30"
  ],
  "Coltrax|CX60": [
    "400x72.5x76"
  ],
  "Coltrax|CX85S": [
    "450x76x82"
  ],
  "Coltrax|MXC550": [
    "450x86x56"
  ],
  "Comacchio|GEO205 (Drilling Machine)": [
    "230x72x43"
  ],
  "Comacchio|GEO305 (Drilling Machine)": [
    "300x55x77",
    "300x52.5x80"
  ],
  "Comeca|Bamby8": [
    "180x72x36"
  ],
  "Comet|MT 13 (Mini Transporter)": [
    "180x72x37"
  ],
  "Comet|MT 13AB (Mini Transporter)": [
    "190x72x37"
  ],
  "Comet|MT 13BB (Mini Transporter)": [
    "230x72x47"
  ],
  "Commander|C4200": [
    "230x72x43"
  ],
  "Commander|H15": [
    "230x72x43"
  ],
  "Comoter|C15": [
    "230x72x42"
  ],
  "Comoter|C18": [
    "230x72x42"
  ],
  "Compair Holman|MTRAX": [
    "200x72x40"
  ],
  "Conjet|ROBOT322": [
    "230x72x43"
  ],
  "Cormidi|10.65 (Mini Transporter)": [
    "180x72x34"
  ],
  "Cormidi|10.65 auto (Mini Transporter)": [
    "180x72x34"
  ],
  "Cormidi|13.80 (Mini Transporter)": [
    "180x72x34"
  ],
  "Cormidi|13.80 auto (Mini Transporter)": [
    "180x72x34"
  ],
  "Cormidi|14.100 (Mini Transporter)": [
    "190x72x37",
    "180x72x37"
  ],
  "Cormidi|14.65 (Mini Transporter)": [
    "180x72x39"
  ],
  "Cormidi|14.90 (Mini Transporter)": [
    "190x72x37",
    "180x72x39"
  ],
  "Cormidi|18.100 (Mini Transporter)": [
    "190x72x37",
    "180x72x39"
  ],
  "Cormidi|18.100 Dtae (Mini Transporter)": [
    "190x72x37",
    "190x72x39"
  ],
  "Cormidi|20.150 (Mini Transporter)": [
    "230x72x48"
  ],
  "Cormidi|23.150 Auto (Mini Transporter)": [
    "250x72x48"
  ],
  "Cormidi|23.150 Dtae (Mini Transporter)": [
    "250x72x48"
  ],
  "Cormidi|23.150 Dum (Mini Transporter)": [
    "250x72x48"
  ],
  "Cormidi|23.150 Ext (Mini Transporter)": [
    "250x72x48"
  ],
  "Cormidi|34.200 Auto (Mini Transporter)": [
    "320x52.5x82",
    "300x52.5x82"
  ],
  "Cormidi|34.200 Dum (Mini Transporter)": [
    "320x52.5x82",
    "300x52.5x82"
  ],
  "Cormidi|5.65 (Mini Transporter)": [
    "180x72x34"
  ],
  "Cormidi|50 (Mini Transporter)": [
    "180x60x37"
  ],
  "Cormidi|56 (Mini Transporter)": [
    "180x72x34"
  ],
  "Cormidi|6.50 RI (Mini Transporter)": [
    "170x60x37",
    "180x60x37"
  ],
  "Cormidi|6.65 (Mini Transporter)": [
    "180x72x34"
  ],
  "Cormidi|65 (Mini Transporter)": [
    "180x72x34"
  ],
  "Cormidi|9.65 (Mini Transporter)": [
    "180x72x34"
  ],
  "Cormidi|9.65 Auto (Mini Transporter)": [
    "180x72x34"
  ],
  "Cormidi|9.65 R (Mini Transporter)": [
    "180x72x37"
  ],
  "Cormidi|C10-80 ACW": [
    "180x72x34"
  ],
  "Cormidi|C100": [
    "200x72x39"
  ],
  "Cormidi|C145": [
    "320x86x48"
  ],
  "Cormidi|C1500": [
    "230x72x54"
  ],
  "Cormidi|C20.150 (Mini Transporter)": [
    "230x72x48"
  ],
  "Cormidi|C85": [
    "180x72x36"
  ],
  "DLGZ|DL15-9": [
    "230x72x43"
  ],
  "Daewoo|450 Plus": [
    "320x86x54",
    "375x86x54",
    "400x86x54"
  ],
  "Daewoo|460 Plus": [
    "320x86x54",
    "375x86x54",
    "400x86x54"
  ],
  "Daewoo|AH30": [
    "300x109x39",
    "300x52.5x80"
  ],
  "Daewoo|DH30": [
    "300x52.5x76",
    "300x52.5x76"
  ],
  "Daewoo|DH35": [
    "300x52.5x84",
    "300x52.5x84"
  ],
  "Daewoo|DH50": [
    "400x73x74",
    "400x72.5x74"
  ],
  "Daewoo|SL035": [
    "300x52.5x84",
    "300x52.5x84"
  ],
  "Daewoo|Solar007": [
    "180x72x37"
  ],
  "Daewoo|Solar010": [
    "180x72x37"
  ],
  "Daewoo|Solar015": [
    "230x96x33",
    "230x48x66"
  ],
  "Daewoo|Solar015Plus": [
    "230x96x35",
    "230x48x70"
  ],
  "Daewoo|Solar018": [
    "230x96x35",
    "230x48x70"
  ],
  "Daewoo|Solar018VT": [
    "230x96x35",
    "230x48x70"
  ],
  "Daewoo|Solar030": [
    "300x52.5x76",
    "300x52.5x76"
  ],
  "Daewoo|Solar030Plus": [
    "300x52.5x76",
    "300x52.5x76"
  ],
  "Daewoo|Solar035": [
    "300x52.52x84",
    "300x52.5x84"
  ],
  "Daewoo|Solar035Plus": [
    "300x52.52x84",
    "300x52.5x84"
  ],
  "Daewoo|Solar10": [
    "180x72x37"
  ],
  "Daewoo|Solar15": [
    "230x96x33",
    "230x48x66"
  ],
  "Daewoo|Solar25": [
    "300x109x36",
    "300x52.5x74"
  ],
  "Daewoo|Solar30": [
    "300x52.5x76",
    "300x52.5x76"
  ],
  "Daewoo|Solar35": [
    "300x109x39",
    "300x52.5x80"
  ],
  "Daewoo|Solar55": [
    "400x73x74",
    "400x72.5x74"
  ],
  "Daewoo|Solar55-3": [
    "400x73x76",
    "400x72.5x76"
  ],
  "Daewoo|Solar55-5": [
    "400x72.5x74"
  ],
  "Daewoo|Solar55-V": [
    "400x73x74",
    "400x72.5x74"
  ],
  "Daewoo|Solar55-VPlus": [
    "400x72.5x74"
  ],
  "Daewoo|Solar55Exv": [
    "400x72.5x72"
  ],
  "Daewoo|Solar70-III": [
    "450x81x74"
  ],
  "Daewoo|Solar75V": [
    "450x81x74"
  ],
  "Dimex|DBM0511": [
    "300x109x41",
    "300x52.5x84"
  ],
  "Dino|185XTC": [
    "250x72x57"
  ],
  "Ditch-Witch|AT 40": [
    "400x72.5x74"
  ],
  "Ditch-Witch|HT 25": [
    "230x72x39"
  ],
  "Ditch-Witch|HT 25K": [
    "230x72x39"
  ],
  "Ditch-Witch|HT 25K (2000 Model)": [
    "230x72x39"
  ],
  "Ditch-Witch|HT 25K (2001 Model)": [
    "230x72x39"
  ],
  "Ditch-Witch|JT 10": [
    "230x72x56"
  ],
  "Ditch-Witch|JT 1200": [
    "230x72x39"
  ],
  "Ditch-Witch|JT 2320": [
    "300x52.5x92"
  ],
  "Ditch-Witch|JT 2321": [
    "300x109x44",
    "300x52.5x92"
  ],
  "Ditch-Witch|JT 25": [
    "300x52.5x98"
  ],
  "Ditch-Witch|JT 2511": [
    "230x72x39"
  ],
  "Ditch-Witch|JT 2520": [
    "320x52.5x92"
  ],
  "Ditch-Witch|JT 2720 (2000)": [
    "320x52.5x92"
  ],
  "Ditch-Witch|JT 2720 (2003)": [
    "320x52.5x98"
  ],
  "Ditch-Witch|JT 30": [
    "320x52.5x98"
  ],
  "Ditch-Witch|JT 3020": [
    "320x52.5x98"
  ],
  "Ditch-Witch|JT 3020 Mach 1": [
    "320x52.5x98"
  ],
  "Ditch-Witch|JT 3510": [
    "230x72x56"
  ],
  "Ditch-Witch|JT 40": [
    "400x72.5x74"
  ],
  "Ditch-Witch|JT 4020": [
    "400x72.5x82"
  ],
  "Ditch-Witch|JT 4020 (Drilling Machine)": [
    "400x72.5x82"
  ],
  "Ditch-Witch|JT 4020 Mach 1": [
    "400x72.5x82"
  ],
  "Ditch-Witch|JT 5": [
    "180x72x39"
  ],
  "Ditch-Witch|JT 520": [
    "180x72x39"
  ],
  "Ditch-Witch|JT 820": [
    "230x72x56"
  ],
  "Ditch-Witch|JT 860": [
    "300x109x44",
    "300x52.5x92"
  ],
  "Ditch-Witch|JT 9 (Drilling Machine)": [
    "230x72x56",
    "2303x72x56"
  ],
  "Ditch-Witch|JT 920 (Drilling Machine)": [
    "230x72x56",
    "2303x72x56"
  ],
  "Ditch-Witch|JT 920L (Drilling Machine)": [
    "230x72x56",
    "2303x72x56"
  ],
  "Ditch-Witch|JT 922": [
    "230x72x56",
    "2303x72x56"
  ],
  "Ditch-Witch|MX 15": [
    "230x96x35",
    "230x48x70"
  ],
  "Ditch-Witch|MX 182": [
    "230x96x35",
    "230x48x70"
  ],
  "Ditch-Witch|MX 202": [
    "250x52.5x78",
    "300x52.5x78"
  ],
  "Ditch-Witch|MX 27": [
    "300x52.5x80"
  ],
  "Ditch-Witch|MX 27-2": [
    "300x52.5x80"
  ],
  "Ditch-Witch|MX 35": [
    "300x52.5x84"
  ],
  "Ditch-Witch|MX 352": [
    "300x52.5x86"
  ],
  "Ditch-Witch|MX 45": [
    "400x72.5x72"
  ],
  "Ditch-Witch|MX 45 CA": [
    "400x72.5x72"
  ],
  "Ditch-Witch|MX 502": [
    "400x73x74",
    "400x72.5x74"
  ],
  "Ditch-Witch|MX9": [
    "180x72x37"
  ],
  "Ditch-Witch|SK 300": [
    "180x72x32"
  ],
  "Ditch-Witch|SK 350": [
    "180x72x32"
  ],
  "Ditch-Witch|SK 600": [
    "230x72x40"
  ],
  "Ditch-Witch|XT 850": [
    "250x72x45"
  ],
  "Ditch-Witch|XT 855": [
    "250x72x45"
  ],
  "Dodich|DM2.1": [
    "230x72x43"
  ],
  "Domine|FUTURO (Drilling Machine)": [
    "230x72x43"
  ],
  "Doosan|DX80": [
    "450x81x76"
  ],
  "Doosan|DX80R": [
    "450x81x76"
  ],
  "Doosan|DX85R": [
    "450x81x76"
  ],
  "Doosan|Dx10z": [
    "180x72x39"
  ],
  "Doosan|Dx19": [
    "230x48x66"
  ],
  "Doosan|Dx27": [
    "300x52.5x78",
    "300x52.5x78"
  ],
  "Doosan|Dx27Z": [
    "300x52.5x80",
    "300x52.5x80"
  ],
  "Doosan|Dx30": [
    "300x52.5x84",
    "300x52.5x84"
  ],
  "Doosan|Dx30Z": [
    "300x52.5x84",
    "300x52.5x84"
  ],
  "Doosan|Dx35": [
    "300x52.5x86",
    "300x52.5x86"
  ],
  "Doosan|Dx35Z": [
    "300x52.5x86",
    "300x52.5x86"
  ],
  "Doosan|Dx35Z-7": [
    "300x52.5x86",
    "300x52.5x86"
  ],
  "Doosan|Dx50Z-7": [
    "400x72.5x74"
  ],
  "Doosan|Dx55": [
    "400x72.5x74"
  ],
  "Doosan|Dx60": [
    "400x72.5x76"
  ],
  "Doosan|Dx60R": [
    "400x72.5x76"
  ],
  "Doosan|Dx62R": [
    "400x72.5x76"
  ],
  "Doosan|Dx63R": [
    "400x72.5x76"
  ],
  "Drago|SWISS": [
    "230x72x43"
  ],
  "Dumec|D 800": [
    "180x72x37"
  ],
  "Dumec|D 800B": [
    "180x72x37"
  ],
  "Dumec|D 800F": [
    "180x72x37"
  ],
  "Dumec|D 800P": [
    "180x72x37"
  ],
  "Dumec|Transporter": [
    "180x72x37"
  ],
  "Durso|10.65 Auto": [
    "180x72x34"
  ],
  "Durso|10.65 Dumper": [
    "180x72x34"
  ],
  "Durso|13.80 Auto": [
    "180x72x34"
  ],
  "Durso|13.80 Dumper": [
    "180x72x34"
  ],
  "Durso|14.100 Auto": [
    "190x72x37",
    "180x723x37"
  ],
  "Durso|14.100 Dumper": [
    "190x72x37",
    "180x723x37"
  ],
  "Durso|18.100 Auto": [
    "190x72x37",
    "180x72x37"
  ],
  "Durso|18.100 DTR": [
    "190x72x37",
    "180x72x37"
  ],
  "Durso|18.100 Dumper": [
    "190x72x37",
    "180x72x37"
  ],
  "Durso|6.50 RI": [
    "190x72x37",
    "180x72x37"
  ],
  "Durso|6.50 RM": [
    "190x72x37",
    "180x72x37"
  ],
  "Durso|9.65 Auto": [
    "180x72x34"
  ],
  "Durso|9.65 Dumper": [
    "180x72x34"
  ],
  "Dynapac|FC 15": [
    "250x72x45"
  ],
  "Dynapac|VC 15": [
    "250x72x45"
  ],
  "Dynapac|VD 15": [
    "250x72x45"
  ],
  "Dynapac|VD 151": [
    "230x96x33",
    "230x48x66"
  ],
  "Dynapac|VD 152": [
    "230x96x33",
    "230x48x66"
  ],
  "Dynapac|VD 251": [
    "300x109x36",
    "300x52.5x74"
  ],
  "Dynapac|VD 351": [
    "300x109x39",
    "300x52.5x80"
  ],
  "EFCO|TN500R": [
    "180x60x38"
  ],
  "EMCI|700": [
    "250x72x52"
  ],
  "Eckart|1B30": [
    "180x72x34"
  ],
  "Eckart|EMB 450B": [
    "180x72x34"
  ],
  "Ecofore|CE 302G": [
    "250x72x52"
  ],
  "Ecofore|CE 403G": [
    "320x100x52"
  ],
  "Electro Joe|Ecojolly": [
    "180x72x34"
  ],
  "Energreen|Robogreen": [
    "250x72x47"
  ],
  "Enteco|E4": [
    "250x72x57"
  ],
  "Erreppi|Carry500": [
    "180x60x38"
  ],
  "EuroCAT|140HVS": [
    "230x72x43"
  ],
  "EuroCAT|150LSE": [
    "230x72x43"
  ],
  "EuroCAT|350LSE": [
    "320x109x39",
    "320x100x44"
  ],
  "EuroTrac|Comet MT13": [
    "190x72x37",
    "180x72x37"
  ],
  "EuroTrac|Comet MT13BB": [
    "230x72x42"
  ],
  "EuroTrac|chasis M 13 (Undercarriage)": [
    "180x72x37"
  ],
  "EuroTrac|chasis T150 (Undercarriage)": [
    "230x96x32",
    "230x48x64"
  ],
  "EuroTrac|chasis T150 Old": [
    "230x96x33",
    "230x96x35",
    "230x48x66",
    "230x48x70"
  ],
  "EuroTrac|chasis T300 (Undercarriage)": [
    "300x109x36",
    "300x52.5x74"
  ],
  "EuroTrac|chasis T300 Old (Undercarriage)": [
    "300x109x39",
    "300x52.5x80"
  ],
  "EuroTrac|chasis T4  (Undercarriage)": [
    "230x72x43"
  ],
  "EuroTrac|chasis T4 Old  (Undercarriage)": [
    "230x72x45"
  ],
  "EuroTrac|chasis T500  (Undercarriage)": [
    "400x146x36",
    "400x72.5x72"
  ],
  "EuroTrac|chasis T500 Old (Undercarriage)": [
    "400x146x36",
    "400x72.5x72"
  ],
  "EurocoMach|100TR": [
    "450x76x82"
  ],
  "EurocoMach|22SR": [
    "230x48x70"
  ],
  "EurocoMach|42ZT": [
    "350x55x88"
  ],
  "EurocoMach|45TR": [
    "350x55x88"
  ],
  "EurocoMach|90ZT": [
    "450x76x82"
  ],
  "EurocoMach|E 1300 (01208 &gt; SN &gt; 01201)": [
    "230x72x43"
  ],
  "EurocoMach|E 1300 (SN &gt; 01208 & SN &lt; 01201)": [
    "200x72x37",
    "180x72x37"
  ],
  "EurocoMach|E 1500 (OLD)": [
    "230x72x43"
  ],
  "EurocoMach|E 1500S": [
    "230x96x32",
    "230x48x64"
  ],
  "EurocoMach|E 1500Sb": [
    "230x72x43"
  ],
  "EurocoMach|E 4000": [
    "300x55x82",
    "300x52.5x84"
  ],
  "EurocoMach|E 800": [
    "180x72x34"
  ],
  "EurocoMach|E1200": [
    "230x72x43"
  ],
  "EurocoMach|EB 09.5 Dumper": [
    "180x72x34"
  ],
  "EurocoMach|ES  150SR": [
    "230x96x35",
    "230x48x70"
  ],
  "EurocoMach|ES 150": [
    "230x96x33",
    "230x48x66"
  ],
  "EurocoMach|ES 150-1": [
    "230x96x33",
    "230x48x66"
  ],
  "EurocoMach|ES 150-2": [
    "230x96x33",
    "230x48x66"
  ],
  "EurocoMach|ES 150-3": [
    "230x48x66",
    "230x96x33"
  ],
  "EurocoMach|ES 180": [
    "230x96x33",
    "230x48x66"
  ],
  "EurocoMach|ES 180-1": [
    "230x96x33",
    "230x48x66"
  ],
  "EurocoMach|ES 180-2": [
    "230x72x43",
    "230x96x32",
    "230x48x64"
  ],
  "EurocoMach|ES 180-3": [
    "230x48x66",
    "230x96x33"
  ],
  "EurocoMach|ES 180-4": [
    "230x96x32",
    "230x48x64"
  ],
  "EurocoMach|ES 180SR": [
    "230x96x35",
    "230x48x70"
  ],
  "EurocoMach|ES 180ZT": [
    "230x48x70"
  ],
  "EurocoMach|ES 18ZT": [
    "230x48x70"
  ],
  "EurocoMach|ES 25ZT": [
    "280x52.5x82",
    "280x52x582"
  ],
  "EurocoMach|ES 300": [
    "300x55x72",
    "300x52.5x74"
  ],
  "EurocoMach|ES 300 ZT": [
    "300x52.5x82",
    "300x52.5x82"
  ],
  "EurocoMach|ES 35.2ZT": [
    "300x52.5x88"
  ],
  "EurocoMach|ES 350ZT": [
    "300x52.5x82",
    "300x52.5x82"
  ],
  "EurocoMach|ES 40.2ZT": [
    "300x52.5x88"
  ],
  "EurocoMach|ES 400": [
    "300x55x82",
    "300x52.5x84"
  ],
  "EurocoMach|ES 400SR": [
    "300x52.5x84",
    "300x52.5x84"
  ],
  "EurocoMach|ES 40ZT": [
    "300x52.5x88"
  ],
  "EurocoMach|ES 500": [
    "400x72.5x72"
  ],
  "EurocoMach|ES 500ZT": [
    "400x72.5x72"
  ],
  "EurocoMach|ES 57ZT": [
    "400x72.5x76"
  ],
  "EurocoMach|ES 60ZT": [
    "400x72.5x76"
  ],
  "EurocoMach|ES 65TR": [
    "400x72.5x76"
  ],
  "EurocoMach|ES 80": [
    "180x72x34"
  ],
  "EurocoMach|ES 800": [
    "450x71x86"
  ],
  "EurocoMach|ES 800TR": [
    "450x71x86"
  ],
  "EurocoMach|ES 85": [
    "450x76x82"
  ],
  "EurocoMach|ES 850ZT": [
    "450x76x82"
  ],
  "EurocoMach|ES 90": [
    "180x72x34"
  ],
  "EurocoMach|ES 90UR": [
    "450x76x82"
  ],
  "EurocoMach|ES 90ZT": [
    "180x72x38"
  ],
  "EurocoMach|ES 95TR": [
    "450x76x82"
  ],
  "EurocoMach|Es 10ZT": [
    "180x72x38"
  ],
  "Eurodig|C 15 (Minilift)": [
    "250x72x52"
  ],
  "Eurodig|C 18 (Minilift)": [
    "250x72x52"
  ],
  "Eurodig|Dumpy 300": [
    "180x60x34"
  ],
  "Eurodig|Dumpy 300M": [
    "180x60x34"
  ],
  "Eurodig|Dumpy 500(Type 1)": [
    "190x72x37",
    "180x72x37"
  ],
  "Eurodig|Dumpy 500(Type 2)": [
    "180x72x34"
  ],
  "Eurodig|Dumpy 800(Type 1)": [
    "180x72x34"
  ],
  "Eurodig|Dumpy 800(Type 2)": [
    "180x60x34"
  ],
  "Eurodig|Dumpy 800(Type 3)": [
    "190x72x37",
    "180x72x37"
  ],
  "Eurodig|G 500": [
    "180x72x34"
  ],
  "Eurodig|GR 1000": [
    "180x72x37"
  ],
  "Eurodig|GR 500": [
    "180x72x34"
  ],
  "Eurodig|GR 500D": [
    "180x72x34"
  ],
  "Eurodig|GR 700": [
    "180x72x34"
  ],
  "Eurodig|GR 700A": [
    "190x72x37",
    "180x72x37"
  ],
  "Eurodig|GR 700A3": [
    "190x72x37",
    "180x72x37"
  ],
  "Eurodig|GR 700D": [
    "190x72x37",
    "180x72x37"
  ],
  "Eurodig|GR 900": [
    "190x72x37",
    "180x72x37"
  ],
  "Eurodig|Miniload 800": [
    "190x72x37",
    "180x72x37"
  ],
  "Eurofor|GEO205 (Drilling Machine)": [
    "230x72x43"
  ],
  "Eurotom|NB 30": [
    "300x55x78",
    "300x52.5x80"
  ],
  "Eurotom|TS 08": [
    "180x72x38"
  ],
  "Eurotom|TS 15": [
    "230x96x33",
    "230x48x66"
  ],
  "Eurotom|TS 15S": [
    "230x96x33",
    "230x48x66"
  ],
  "Eurotom|TS 17SE": [
    "230x96x33",
    "230x48x66"
  ],
  "Eurotom|TS 25": [
    "300x55x72",
    "300x52.5x74"
  ],
  "Eurotom|TS 27S": [
    "300x52.5x74",
    "300x52.5x74"
  ],
  "Eurotom|TS 30": [
    "300x55x78",
    "300x52.5x80"
  ],
  "Eurotom|TS 30R": [
    "300x55x78",
    "300x52.5x80"
  ],
  "Eurotom|TS 35": [
    "300x55x78",
    "300x52.5x80"
  ],
  "Eurotom|TS 35S": [
    "300x55x78",
    "300x52.5x80"
  ],
  "Eurotom|TS 75": [
    "450x71x86"
  ],
  "Eurotom|TS 75S": [
    "450x71x86"
  ],
  "FAI|212 New": [
    "230x96x31",
    "230x48x62"
  ],
  "FAI|212 Old": [
    "230x72x43"
  ],
  "FAI|215": [
    "230x96x31",
    "230x48x62"
  ],
  "FAI|218": [
    "230x96x31",
    "230x48x62"
  ],
  "FAI|230": [
    "300x109x39",
    "300x109x41",
    "300x52.5x80",
    "300x52.5x84",
    "300x55x71",
    "300x55x81"
  ],
  "FAI|235": [
    "300x109x41",
    "300x52.5x84",
    "300x55x81"
  ],
  "FAI|240": [
    "300x109x41",
    "300x52.5x84",
    "300x55x81"
  ],
  "FAI|410C": [
    "450x76x84"
  ],
  "FIGO|MC 150 (Mini Dumper)": [
    "180x72x36"
  ],
  "FORT|Minidumper": [
    "180x60x38"
  ],
  "Falcon Spider|FS290C": [
    "300x55x78",
    "300x52.5x80"
  ],
  "Fercad|T 3250": [
    "180x60x34"
  ],
  "Fermec|114": [
    "230x96x31",
    "230x48x62"
  ],
  "Fermec|115": [
    "230x96x31",
    "230x48x62"
  ],
  "Fermec|123": [
    "250x109x35",
    "300x52.5x72"
  ],
  "Fermec|125": [
    "300x109x38",
    "300x52.5x78"
  ],
  "Fermec|128": [
    "300x109x38",
    "300x52.5x78"
  ],
  "Fermec|130": [
    "300x109x40",
    "300x52.5x82"
  ],
  "Fermec|131": [
    "300x109x40",
    "300x52.5x82"
  ],
  "Fermec|135": [
    "350x108x42",
    "350x52.5x86"
  ],
  "Fermec|145": [
    "400x73x74",
    "400x72.5x73"
  ],
  "Fermec|150": [
    "400x73x74",
    "400x72.5x73"
  ],
  "Fermec|SK 015": [
    "230x96x31",
    "230x48x62"
  ],
  "Fermec|SK 025": [
    "300x109x38",
    "300x52.5x78"
  ],
  "Fermec|SK 030": [
    "300x109x40",
    "300x52.5x82"
  ],
  "Fermec|SK 035": [
    "350x108x42",
    "350x52.5x86"
  ],
  "Fiat-Hitachi|FH 15": [
    "230x96x31",
    "230x48x62"
  ],
  "Fiat-Hitachi|FH 15.2": [
    "230x96x31",
    "230x48x62"
  ],
  "Fiat-Hitachi|FH 15.2 Plus": [
    "230x96x31",
    "230x48x62"
  ],
  "Fiat-Hitachi|FH 16.2": [
    "230x96x33",
    "230x48x66"
  ],
  "Fiat-Hitachi|FH 17.2": [
    "230x96x33",
    "230x48x66"
  ],
  "Fiat-Hitachi|FH 17.2 Plus": [
    "230x96x33",
    "230x48x66"
  ],
  "Fiat-Hitachi|FH 17.2-B": [
    "230x96x33",
    "230x48x66"
  ],
  "Fiat-Hitachi|FH 22": [
    "250x52.5x73",
    "300x52.5x72"
  ],
  "Fiat-Hitachi|FH 22.2": [
    "250x52.5x73",
    "300x52.5x72"
  ],
  "Fiat-Hitachi|FH 30.2": [
    "300x55x80",
    "300x52.5x82"
  ],
  "Fiat-Hitachi|FH 30.2 Plus": [
    "300x55x80",
    "300x52.5x82"
  ],
  "Fiat-Hitachi|FH 35.2": [
    "300x55x80",
    "300x52.5x82"
  ],
  "Fiat-Hitachi|FH 35.2 Plus": [
    "300x55x80",
    "300x52.5x82"
  ],
  "Fiat-Hitachi|FH 40.2": [
    "400x72.5x72"
  ],
  "Fiat-Hitachi|FH 40.2 Plus": [
    "400x72.5x72"
  ],
  "Fiori|800": [
    "180x72x34"
  ],
  "Fiori|Dumpy Proffesional": [
    "180x72x37"
  ],
  "Fiori|Eurodig 1000": [
    "180x72x37"
  ],
  "Fiori|GR 1000": [
    "180x72x37"
  ],
  "Fiori|GR 500": [
    "180x72x34"
  ],
  "Fiori|GR 700": [
    "180x72x37"
  ],
  "Fiori|Minding": [
    "180x72x37"
  ],
  "Foredil|FM 16": [
    "230x72x45"
  ],
  "Foredil|FM 18V": [
    "230x72x45"
  ],
  "Foredil|FM 19RSV": [
    "230x72x45"
  ],
  "Foredil|FM 19VR": [
    "230x72x45"
  ],
  "Foredil|FM 24": [
    "300x55x72",
    "300x52.5x74"
  ],
  "Foredil|FM 29": [
    "300x55x78",
    "300x52.5x80"
  ],
  "Foredil|FM 34": [
    "300x55x78",
    "300x52.5x80"
  ],
  "Foredil|FM 54": [
    "400x73x72",
    "400x72.5x72"
  ],
  "Forti|Forti": [
    "180x60x38",
    "230x48x66",
    "230x96x33"
  ],
  "Fraste|Multidrill ML (drilling machine)": [
    "250x72x52",
    "230x96x39",
    "250x48x78"
  ],
  "Fraste|Multidrill PL (drilling machine)": [
    "230x72x43"
  ],
  "Fraste|Multidrill XL (drilling machine)": [
    "300x55x82",
    "300x52.5x84"
  ],
  "Fraste|Terrain (drilling machine)": [
    "180x72x34"
  ],
  "Gayk|HRE1000": [
    "300x55x78",
    "300x52.5x80"
  ],
  "Gayk|HRE3000": [
    "300x55x78",
    "300x52.5x80"
  ],
  "Geawelltech|Well drill 3050CR": [
    "400x72.5x74"
  ],
  "Gehl|12002": [
    "500x92x78"
  ],
  "Gehl|153": [
    "230x96x36",
    "230x48x72"
  ],
  "Gehl|193": [
    "250x96x38",
    "250x48x76"
  ],
  "Gehl|223": [
    "250x96x38",
    "250x48x76"
  ],
  "Gehl|253": [
    "250x109x37",
    "300x52.5x76"
  ],
  "Gehl|303": [
    "300x109x38",
    "300x52.5x78"
  ],
  "Gehl|353": [
    "300x109x41",
    "300x52.5x84"
  ],
  "Gehl|363": [
    "300x109x39",
    "300x52.5x80"
  ],
  "Gehl|373": [
    "300x109x41",
    "300x52.5x84"
  ],
  "Gehl|383Z": [
    "300x52.5x84"
  ],
  "Gehl|502": [
    "400x73x74",
    "400x72.5x74"
  ],
  "Gehl|503": [
    "400x72.5x74"
  ],
  "Gehl|503Z": [
    "400x72.5x74"
  ],
  "Gehl|603": [
    "400x72.5x74"
  ],
  "Gehl|753": [
    "450x71x86"
  ],
  "Gehl|753Z": [
    "450x71x86"
  ],
  "Gehl|75Z3": [
    "450x71x86"
  ],
  "Gehl|8003": [
    "450x76x80"
  ],
  "Gehl|802": [
    "450x71x84"
  ],
  "Gehl|803": [
    "450x76x80"
  ],
  "Gehl|GE 12002": [
    "500x92x78"
  ],
  "Gehl|GE 142 (US Market)": [
    "230x96x33",
    "230x48x66"
  ],
  "Gehl|GE 152 (US Market)": [
    "230x96x33",
    "230x48x66"
  ],
  "Gehl|GE 153": [
    "230x96x36",
    "230x48x72"
  ],
  "Gehl|GE 192 (US Market)": [
    "230x96x33",
    "230x48x72"
  ],
  "Gehl|GE 193": [
    "250x96x38",
    "250x48x76"
  ],
  "Gehl|GE 222 (US Market)": [
    "230x96x36",
    "230x48x72"
  ],
  "Gehl|GE 223": [
    "250x96x38",
    "250x48x76"
  ],
  "Gehl|GE 253": [
    "250x109x37",
    "300x52.5x76"
  ],
  "Gehl|GE 272 (US Market)": [
    "300x54x72",
    "300x52.5x72"
  ],
  "Gehl|GE 292 (US Market)": [
    "300x54x72",
    "300x52.5x74"
  ],
  "Gehl|GE 303": [
    "300x109x38",
    "300x52.5x78"
  ],
  "Gehl|GE 342 (US Market)": [
    "320x54x78",
    "300x52.5x80"
  ],
  "Gehl|GE 353": [
    "300x109x41",
    "300x52.5x84"
  ],
  "Gehl|GE 362 (US Market)": [
    "320x54x78",
    "300x52.5x80"
  ],
  "Gehl|GE 373": [
    "300x109x41",
    "300x52.5x84"
  ],
  "Gehl|GE 502 (US Market)": [
    "400x72.5x74"
  ],
  "Gehl|GE 602 (US Market)": [
    "400x72.5x74"
  ],
  "Gehl|GE 802 (US Market)": [
    "450x71x84"
  ],
  "Gehl|GE503Z": [
    "400x72.5x74"
  ],
  "Gehl|Z35": [
    "300x55x84",
    "300x52.5x88"
  ],
  "Gehl|Z45": [
    "400x75.5x74"
  ],
  "Gehl|Z80": [
    "450x83.5x74"
  ],
  "Gehlmax|A 12": [
    "230x72x43"
  ],
  "Gehlmax|A 12B": [
    "230x72x43"
  ],
  "Gehlmax|A 14SA": [
    "230x72x43"
  ],
  "Gehlmax|DR 600": [
    "200x72x40"
  ],
  "Gehlmax|GX 10": [
    "200x72x42"
  ],
  "Gehlmax|GX 35": [
    "400x72.5x72"
  ],
  "Gehlmax|M 045": [
    "180x72x36"
  ],
  "Gehlmax|M 135": [
    "250x72x45"
  ],
  "Gehlmax|M 135S": [
    "230x72x43"
  ],
  "Gehlmax|MB 045": [
    "180x72x36"
  ],
  "Gehlmax|MB 1135": [
    "250x72x45"
  ],
  "Gehlmax|MB 1135S": [
    "250x72x45"
  ],
  "Gehlmax|MB 138": [
    "230x72x43"
  ],
  "Gehlmax|MB 145": [
    "250x72x45"
  ],
  "Gehlmax|MB 148": [
    "230x72x43"
  ],
  "Gehlmax|MB 165": [
    "250x72x45"
  ],
  "Gehlmax|MB 253": [
    "300x109x37",
    "300x52.5x76"
  ],
  "Gehlmax|MB 288": [
    "300x55x76",
    "300x52.5x78"
  ],
  "Gehlmax|MB 358": [
    "300x55x82",
    "300x52.5x84"
  ],
  "Gehlmax|RD 10 (Mini Dumper)": [
    "180x72x37"
  ],
  "Gehlmax|RD 10 SLE (Mini Dumper)": [
    "180x72x37"
  ],
  "Gehlmax|RD 15D (Mini Dumper)": [
    "250x72x52"
  ],
  "Gehlmax|RD 15DR (Mini Dumper)": [
    "250x72x52"
  ],
  "Gehlmax|RD 6HX (Mini Dumper)": [
    "180x72x34"
  ],
  "Gehlmax|RD 7": [
    "180x72x34"
  ],
  "Gehlmax|RD 7-10D (Mini Dumper)": [
    "180x72x34"
  ],
  "Gehlmax|RD 7SLE (Mini Dumper)": [
    "180x72x37"
  ],
  "Gehlmax|RD 8 (Mini Dumper)": [
    "180x72x37"
  ],
  "Gehlmax|RD 8HX (Mini Dumper)": [
    "180x72x37"
  ],
  "Gehlmax|RD 8SLE (Mini Dumper)": [
    "180x72x37"
  ],
  "Geier|40S": [
    "230x72x48"
  ],
  "Geier|60S": [
    "250x72x52"
  ],
  "Geier|85TLY": [
    "250x72x57"
  ],
  "Gelai & Castegnaro|G&C": [
    "250x72x52"
  ],
  "Genie|S-60 Trax (Quad)": [
    "450x86x42"
  ],
  "Genie|S-65 Trax (Quad) 400 Wide": [
    "400x86x42"
  ],
  "Genie|S-65 Trax (Quad) 450 Wide": [
    "450x86x42"
  ],
  "Geoprobe|54DT (Drilling Machine)": [
    "230x72x56"
  ],
  "Geoprobe|6610DT (Drilling Machine)": [
    "230x72x56"
  ],
  "Geoprobe|7822DT (Drilling Machine)": [
    "300x52.5x90"
  ],
  "Goman|T30": [
    "250x72x52"
  ],
  "Goman|X08": [
    "180x72x57",
    "250x72x52"
  ],
  "Goman|X16": [
    "200x72x43"
  ],
  "Green Mech|ST19-28": [
    "250x72x52"
  ],
  "Green Mech|ST220": [
    "250x72x52"
  ],
  "Green Technik|BC350": [
    "180x72x37"
  ],
  "Grillo|Dumper 350 Basic": [
    "180x60x34"
  ],
  "Grillo|Dumper 350 HD": [
    "180x72x34"
  ],
  "Grillo|Dumper 507": [
    "180x72x34"
  ],
  "Grundohit|4S": [
    "250x72x57"
  ],
  "Grundohit|TT": [
    "250x72x52"
  ],
  "Grundohit|Undercarriage 40": [
    "250x72x52"
  ],
  "HCC|1050-B (Mini-Carrier)": [
    "180x72x37"
  ],
  "HCC|1051 (Mini-Carrier)": [
    "180x72x37"
  ],
  "HCC|1051-B (Mini-Carrier)": [
    "180x72x37"
  ],
  "HCC|1051-D (Mini-Carrier)": [
    "180x72x37"
  ],
  "HOEFLON|C6 (Spider Crane)": [
    "180x72x37"
  ],
  "Hades|TP 1500": [
    "250x72x57"
  ],
  "Haihong|CTX8008": [
    "180x72x39"
  ],
  "Hainzl|150LSE": [
    "230x72x43"
  ],
  "Hanix|H 08": [
    "180x72x36"
  ],
  "Hanix|H 08-1": [
    "180x72x37"
  ],
  "Hanix|H 08-2": [
    "180x72x36"
  ],
  "Hanix|H 08A": [
    "180x72x37"
  ],
  "Hanix|H 08B": [
    "180x72x38"
  ],
  "Hanix|H 09D": [
    "180x72x38"
  ],
  "Hanix|H 12A": [
    "230x96x31",
    "230x48x62"
  ],
  "Hanix|H 15": [
    "230x96x33",
    "230x96x31",
    "230x48x62",
    "230x48x66"
  ],
  "Hanix|H 15 B": [
    "230x96x31",
    "230x48x62"
  ],
  "Hanix|H 15 B-2": [
    "230x96x33",
    "230x48x66"
  ],
  "Hanix|H 15 Bplus": [
    "230x96x31",
    "230x48x62"
  ],
  "Hanix|H 15 Bplus-2": [
    "230x96x33",
    "230x48x66"
  ],
  "Hanix|H 151": [
    "230x96x33",
    "230x48x66"
  ],
  "Hanix|H 15A (<1996)": [
    "230x96x33",
    "230x48x66"
  ],
  "Hanix|H 15A (>1996)": [
    "230x96x31",
    "230x48x62"
  ],
  "Hanix|H 22": [
    "300x55x72",
    "300x52x574"
  ],
  "Hanix|H 22A": [
    "300x55x72",
    "300x52x574"
  ],
  "Hanix|H 24": [
    "300x52.5x74",
    "300x52x574"
  ],
  "Hanix|H 24A": [
    "300x55x72",
    "300x52.5x74"
  ],
  "Hanix|H 26B": [
    "300x55x72",
    "300x52.5x74"
  ],
  "Hanix|H 26C": [
    "300x52.5x74",
    "300x52.5x74"
  ],
  "Hanix|H 27": [
    "300x109x36",
    "300x52.5x74"
  ],
  "Hanix|H 27-2": [
    "300x109x36",
    "300x52.5x74"
  ],
  "Hanix|H 29A": [
    "300x55x78",
    "300x52.5x80"
  ],
  "Hanix|H 30": [
    "300x55x78",
    "300x52.5x80"
  ],
  "Hanix|H 30-2": [
    "300x55x78",
    "300x52.5x80"
  ],
  "Hanix|H 30A": [
    "300x55x78",
    "300x52.5x80"
  ],
  "Hanix|H 35": [
    "300x55x78",
    "300x52.5x80"
  ],
  "Hanix|H 35A": [
    "300x55x78",
    "300x52.5x80"
  ],
  "Hanix|H 36A": [
    "300x55x78",
    "300x52.5x80"
  ],
  "Hanix|H 36B": [
    "300x55x82",
    "300x52.5x84"
  ],
  "Hanix|H 36C": [
    "300x52.5x84",
    "300x52.5x84"
  ],
  "Hanix|H 36CR": [
    "300x52.5x84",
    "300x52.5x84"
  ],
  "Hanix|H 36R": [
    "300x52.5x84",
    "300x52.5x84"
  ],
  "Hanix|H 50B": [
    "400x72.5x72"
  ],
  "Hanix|H 50C": [
    "400x72.5x72"
  ],
  "Hanix|H 55DR": [
    "400x72.5x72"
  ],
  "Hanix|H 56C": [
    "400x72.5x72"
  ],
  "Hanix|H 75B": [
    "450x71x86"
  ],
  "Hanix|H 75C": [
    "450x71x86"
  ],
  "Hanix|H 80": [
    "180x72x37"
  ],
  "Hanix|H 80-2": [
    "180x72x37"
  ],
  "Hanix|N 050": [
    "180x72x38"
  ],
  "Hanix|N 06": [
    "250x72x45"
  ],
  "Hanix|N 060": [
    "250x72x45"
  ],
  "Hanix|N 080": [
    "180x72x37"
  ],
  "Hanix|N 080-1": [
    "180x72x37"
  ],
  "Hanix|N 080-2": [
    "180x72x36"
  ],
  "Hanix|N 080-2LR": [
    "180x72x38"
  ],
  "Hanix|N 080-3LR": [
    "180x72x37"
  ],
  "Hanix|N 120": [
    "250x72x45"
  ],
  "Hanix|N 120-2": [
    "230x96x33",
    "230x48x66"
  ],
  "Hanix|N 120R": [
    "250x72x45"
  ],
  "Hanix|N 150": [
    "230x72x43"
  ],
  "Hanix|N 150-2": [
    "230x96x33",
    "230x48x66"
  ],
  "Hanix|N 150R": [
    "230x72x43"
  ],
  "Hanix|N 220-2": [
    "320x109x36",
    "300x52.5x74"
  ],
  "Hanix|N 230-2": [
    "320x109x36",
    "300x52.5x74"
  ],
  "Hanix|N 250-2": [
    "320x109x36",
    "300x52.5x74"
  ],
  "Hanix|N 260-2": [
    "320x109x36",
    "300x52.5x74"
  ],
  "Hanix|N 300-2": [
    "320x109x39",
    "300x52.5x80"
  ],
  "Hanix|N 35": [
    "300x55x78",
    "300x52.5x80"
  ],
  "Hanix|N 350-2": [
    "320x109x39",
    "300x52.5x80"
  ],
  "Hanix|N 80": [
    "180x72x36"
  ],
  "Hanix|N 80-2": [
    "180x72x36"
  ],
  "Hanix|N 80-2R": [
    "180x72x36"
  ],
  "Hanix|NH 070": [
    "230x96x41",
    "250x47x84",
    "250x48x82"
  ],
  "Hanix|NS 25": [
    "300x109x36",
    "300x52.5x74"
  ],
  "Hanix|RT 30 (Dumper)": [
    "180x72x36",
    "180x72x37"
  ],
  "Hanix|RT 50D (Dumper)": [
    "200x72x38",
    "180x72x38"
  ],
  "Hanix|S&B15": [
    "320x100x40",
    "320x100x43"
  ],
  "Hanix|S&B15R": [
    "320x100x40",
    "320x100x43"
  ],
  "Hanix|S&B15S": [
    "320x100x40",
    "320x100x43"
  ],
  "Hanix|S&B15SR": [
    "320x100x40",
    "320x100x43"
  ],
  "Hanix|S&B25-1": [
    "400x72.5x72"
  ],
  "Hanix|S&B25-2": [
    "400x142x38",
    "400x72.5x74"
  ],
  "Hanix|S&B300": [
    "300x52.5x80",
    "300x52.5x80"
  ],
  "Hanix|S&B300-2": [
    "300x52.5x80",
    "300x52.5x80"
  ],
  "Hanix|S&BX-1": [
    "300x52.5x80",
    "300x52.5x80"
  ],
  "Hanix|TP50-D": [
    "300x55x80",
    "300x52.5x82"
  ],
  "Hanix|YB 10": [
    "230x72x43"
  ],
  "Hanix|YFW 5D-1": [
    "230x72x50"
  ],
  "Hansa|C65RX": [
    "230x72x43"
  ],
  "Hanta|SLD 151D": [
    "180x72x37"
  ],
  "Haulotte|Mygalift19 (Lifting Platform)": [
    "250x72x57"
  ],
  "Hematec|CTE CS 135 (Crane)": [
    "180x72x37"
  ],
  "Hematec|CTE CS 170 (Sky Lifter)": [
    "230x72x43"
  ],
  "Hengte|HT20": [
    "230x48x68"
  ],
  "Hiab|033T": [
    "180x72x37"
  ],
  "Hinowa|DB 10.13": [
    "200x96x28",
    "230x96x66"
  ],
  "Hinowa|DB 14.7": [
    "180x72x37"
  ],
  "Hinowa|DB 8.35": [
    "180x72x37"
  ],
  "Hinowa|DB 9.11": [
    "200x72x37",
    "180x72x37"
  ],
  "Hinowa|DM 09": [
    "200x72x37",
    "180x72x37"
  ],
  "Hinowa|DM 10": [
    "200x72x37",
    "230x72x43",
    "180x72x37"
  ],
  "Hinowa|DM 10A 2V": [
    "200x72x42"
  ],
  "Hinowa|DM 10M": [
    "180x72x39"
  ],
  "Hinowa|DM 11KA": [
    "230x72x42"
  ],
  "Hinowa|DM 13": [
    "200x72x42"
  ],
  "Hinowa|DM 13A 2V": [
    "200x72x42"
  ],
  "Hinowa|DM 15": [
    "230x72x43",
    "230x96x32",
    "230x48x64"
  ],
  "Hinowa|DM 15M": [
    "230x96x32",
    "230x48x64"
  ],
  "Hinowa|DM 15S": [
    "230x72x43"
  ],
  "Hinowa|DM 20": [
    "250x72x52"
  ],
  "Hinowa|DM 20S": [
    "250x72x52",
    "250x48x78",
    "230x96x39"
  ],
  "Hinowa|DM 30": [
    "300x55x82",
    "300x52.5x84"
  ],
  "Hinowa|DM 30C": [
    "300x109x36",
    "300x52.5x74"
  ],
  "Hinowa|DM 30S": [
    "300x55x82",
    "300x52.5x84"
  ],
  "Hinowa|DM 40": [
    "300x55x82",
    "300x52.5x84"
  ],
  "Hinowa|DM 40L": [
    "300x55x82",
    "300x52.5x84"
  ],
  "Hinowa|DM 40L2V": [
    "300x55x82",
    "300x52.5x84"
  ],
  "Hinowa|DM 8": [
    "180x72x34"
  ],
  "Hinowa|DM 8A": [
    "180x72x34"
  ],
  "Hinowa|DM 8M": [
    "180x72x34"
  ],
  "Hinowa|Dumpy (minidumper)": [
    "180x60x37"
  ],
  "Hinowa|GL 1255 (Lifting Platform)": [
    "180x72x37"
  ],
  "Hinowa|GL 1470 (Lifting Platform)": [
    "180x72x37"
  ],
  "Hinowa|Gold lift 12.55 (Lifting Platform)": [
    "180x72x37"
  ],
  "Hinowa|Gold lift 14.70 (Lifting Platform)": [
    "180x72x37"
  ],
  "Hinowa|Gold lift 17.80XL (Lifting Platform)": [
    "180x72x37"
  ],
  "Hinowa|HP 1000 (Mini Dumper)": [
    "180x72x34",
    "180x72x37"
  ],
  "Hinowa|HP 1000E (Mini Dumper)": [
    "180x72x37"
  ],
  "Hinowa|HP 1100 (Mini Dumper)": [
    "180x72x37"
  ],
  "Hinowa|HP 1100A (Mini Dumper)": [
    "180x72x37"
  ],
  "Hinowa|HP 1100D (Mini Dumper)": [
    "180x72x37"
  ],
  "Hinowa|HP 1150 (Mini Dumper)": [
    "180x72x37"
  ],
  "Hinowa|HP 1200 (Mini Dumper)": [
    "180x72x37"
  ],
  "Hinowa|HP 1200E": [
    "180x72x37"
  ],
  "Hinowa|HP 1500 (Mini Dumper)": [
    "230x72x43",
    "230x96x39",
    "230x96x40",
    "250x48x78",
    "250x48x80"
  ],
  "Hinowa|HP 1500/2": [
    "230x96x38",
    "250x48x76"
  ],
  "Hinowa|HP 800 (Mini-Excavator)": [
    "180x72x34"
  ],
  "Hinowa|HP 800A (Mini Dumper)": [
    "180x72x34"
  ],
  "Hinowa|HP 800E (Mini Dumper)": [
    "180x72x34"
  ],
  "Hinowa|HP 850B/A": [
    "180x72x35",
    "180x72x37"
  ],
  "Hinowa|HR 15.1": [
    "230x72x43"
  ],
  "Hinowa|HS 1100": [
    "180x72x37"
  ],
  "Hinowa|HS 1150": [
    "180x72x37"
  ],
  "Hinowa|HS 1200E": [
    "180x72x37"
  ],
  "Hinowa|HS 701": [
    "180x72x37"
  ],
  "Hinowa|HS 850": [
    "180x72x35"
  ],
  "Hinowa|LL 14.72 (Lifter)": [
    "180x72x37"
  ],
  "Hinowa|LL 15.70 (Lifter)": [
    "180x72x37"
  ],
  "Hinowa|LL 19.65 (Lifter)": [
    "180x72x37"
  ],
  "Hinowa|LL 23.12 (Lifter)": [
    "230x96x39",
    "250x48x78"
  ],
  "Hinowa|LL 33.17 (Lifter)": [
    "300x55x82",
    "300x52.5x84"
  ],
  "Hinowa|PT 10 (Undercarriage)": [
    "200x72x37",
    "180x72x37"
  ],
  "Hinowa|PT 100 (Undercarriage)": [
    "500x92x72",
    "485x92x72"
  ],
  "Hinowa|PT 10G (Undercarriage)": [
    "200x72x37",
    "180x72x37"
  ],
  "Hinowa|PT 10G/300 (Undercarriage)": [
    "200x72x37",
    "180x72x37"
  ],
  "Hinowa|PT 30G (Undercarriage)": [
    "300x55x82",
    "300x52.5x84"
  ],
  "Hinowa|PT 30G/200 (Undercarriage)": [
    "300x55x82",
    "300x52.5x84"
  ],
  "Hinowa|PT 35GL (undercarriage)": [
    "320x100x52"
  ],
  "Hinowa|PT 35GL/300 (undercarriage)": [
    "320x100x52"
  ],
  "Hinowa|PT 4000 (undercarriage)": [
    "350x109x42",
    "350x52.5x86"
  ],
  "Hinowa|PT 4000G/100 (undercarriage)": [
    "350x109x42",
    "350x52.5x86"
  ],
  "Hinowa|PT 70 (undercarriage)": [
    "400x72.5x74"
  ],
  "Hinowa|PT 70G/100 (undercarriage)": [
    "400x72.5x74"
  ],
  "Hinowa|PT 70GL (undercarriage)": [
    "400x72.5x82"
  ],
  "Hinowa|PT 8 (undercarriage)": [
    "180x72x34"
  ],
  "Hinowa|PT 8G/300 (undercarriage)": [
    "180x72x34"
  ],
  "Hinowa|PT 9 (undercarriage)": [
    "180x72x37"
  ],
  "Hinowa|PT 9C (undercarriage)": [
    "180x72x35"
  ],
  "Hinowa|PT13 (Undercarriage)": [
    "200x72x42"
  ],
  "Hinowa|PT13/300 (Undercarriage)": [
    "200x72x42"
  ],
  "Hinowa|PT15 (Undercarriage)": [
    "230x72x43"
  ],
  "Hinowa|PT150 (Undercarriage)": [
    "500x92x72",
    "485x92x72"
  ],
  "Hinowa|PT15G (Undercarriage)": [
    "230x96x32",
    "230x48x64"
  ],
  "Hinowa|PT15G/400 (Undercarriage)": [
    "230x72x43"
  ],
  "Hinowa|PT15G/4001 (Undercarriage)": [
    "230x96x32",
    "230x48x64"
  ],
  "Hinowa|PT1700 (Undercarriage)": [
    "230x96x35",
    "230x48x70"
  ],
  "Hinowa|PT20 (Undercarriage)": [
    "250x72x52"
  ],
  "Hinowa|PT2000 (Undercarriage)": [
    "230x96x39",
    "250x48x78"
  ],
  "Hinowa|PT2000G/100 (Undercarriage)": [
    "230x96x39",
    "250x48x78"
  ],
  "Hinowa|PT200P (Undercarriage)": [
    "230x96x40",
    "250x48x80"
  ],
  "Hinowa|PT20G (Undercarriage)": [
    "250x72x52"
  ],
  "Hinowa|PT20G/301 (Undercarriage)": [
    "250x72x52"
  ],
  "Hinowa|PT20G/3011 (Undercarriage)": [
    "250x96x39",
    "250x48x78"
  ],
  "Hinowa|PT20GL (Undercarriage)": [
    "250x72x57"
  ],
  "Hinowa|PT20GL/301 (Undercarriage)": [
    "250x72x57"
  ],
  "Hinowa|PT3000 (Undercarriage)": [
    "300x54x78",
    "300x52.5x80"
  ],
  "Hinowa|PT3000G/100 (Undercarriage)": [
    "300x55x78",
    "300x52.5x80"
  ],
  "Hinowa|TT 1350": [
    "200x96x33",
    "230x48x66"
  ],
  "Hinowa|TT 1600": [
    "230x96x35",
    "230x48x70"
  ],
  "Hinowa|TT 1700": [
    "230x96x35",
    "230x48x70"
  ],
  "Hinowa|VT 1550": [
    "230x72x43",
    "230x48x64",
    "230x96x32"
  ],
  "Hinowa|VT 1550 2V": [
    "230x72x43"
  ],
  "Hinowa|VT 1650": [
    "230x72x43",
    "230x48x64",
    "230x96x32"
  ],
  "Hinowa|VT 1650 2V": [
    "230x72x43"
  ],
  "Hinowa|VT 2000": [
    "230x96x39",
    "250x48x78"
  ],
  "Hinowa|VT 2500": [
    "250x107.5x37",
    "250x52.5x76",
    "300x52.5x76"
  ],
  "Hinowa|VT 3000": [
    "300x52.5x76",
    "250x52.5x76",
    "300x52.5x76"
  ],
  "Hinowa|VT 3000 2V": [
    "300x54x78",
    "300x52.5x80"
  ],
  "Hinowa|VT 4000": [
    "350x108x42",
    "350x52.5x86"
  ],
  "Hinowa|VT 4000 2V": [
    "350x109x42",
    "350x52.5x86"
  ],
  "Hinowa|VTT 1300": [
    "200x96x31",
    "230x48x62"
  ],
  "Hinowa|VTT 1550": [
    "200x96x35",
    "230x48x70"
  ],
  "Hinowa|VTT 1650": [
    "200x96x35",
    "230x48x70"
  ],
  "Hinowa|YB 10": [
    "230x72x43"
  ],
  "Hinowa|YFW 5D-1": [
    "230x72x50"
  ],
  "Hitachi|16": [
    "230x96x33",
    "230x48x66"
  ],
  "Hitachi|18": [
    "230x96x33",
    "230x48x66"
  ],
  "Hitachi|25": [
    "250x52.5x73",
    "300x52.5x72"
  ],
  "Hitachi|30": [
    "300x52.5x82",
    "300x52.5x82"
  ],
  "Hitachi|30U": [
    "300x52.5x86",
    "300x52.5x86"
  ],
  "Hitachi|35": [
    "300x52.5x82",
    "300x52.5x82"
  ],
  "Hitachi|35U": [
    "300x52.5x86",
    "300x52.5x86"
  ],
  "Hitachi|40": [
    "400x72.5x72"
  ],
  "Hitachi|40U": [
    "400x72.5x72"
  ],
  "Hitachi|50": [
    "400x72.5x72"
  ],
  "Hitachi|50U": [
    "400x72.5x72"
  ],
  "Hitachi|50U-2": [
    "400x72.5x72"
  ],
  "Hitachi|55U": [
    "400x72.5x72"
  ],
  "Hitachi|70": [
    "450x81x78",
    "450x81x78"
  ],
  "Hitachi|80": [
    "450x81x78",
    "450x81x78"
  ],
  "Hitachi|85": [
    "450x81x78",
    "450x81x78"
  ],
  "Hitachi|AX16-2N (2002)": [
    "230x96x33",
    "230x48x66"
  ],
  "Hitachi|CG 100 (Dumper)": [
    "750x150x66"
  ],
  "Hitachi|CG 110 (Dumper)": [
    "750x150x66"
  ],
  "Hitachi|CG 65 (Dumper)": [
    "700x100x98"
  ],
  "Hitachi|EX 08": [
    "180x72x37"
  ],
  "Hitachi|EX 100": [
    "500x92x78"
  ],
  "Hitachi|EX 100-1": [
    "500x92x78"
  ],
  "Hitachi|EX 100-2": [
    "500x92x78"
  ],
  "Hitachi|EX 100-3": [
    "500x92x78"
  ],
  "Hitachi|EX 100-5": [
    "500x92x78"
  ],
  "Hitachi|EX 105": [
    "500x92x78"
  ],
  "Hitachi|EX 10U": [
    "180x72x40"
  ],
  "Hitachi|EX 10UX": [
    "180x72x40"
  ],
  "Hitachi|EX 12 (New)": [
    "230x96x31",
    "230x48x62"
  ],
  "Hitachi|EX 12 (old)": [
    "230x72x42"
  ],
  "Hitachi|EX 12-1": [
    "230x96x31",
    "230x48x62"
  ],
  "Hitachi|EX 12-2": [
    "230x96x31",
    "230x48x62"
  ],
  "Hitachi|EX 120 (not on new sprocket)": [
    "500x92x84"
  ],
  "Hitachi|EX 120-2": [
    "500x92x84"
  ],
  "Hitachi|EX 120-5": [
    "500x92x84"
  ],
  "Hitachi|EX 135U": [
    "500x92x84"
  ],
  "Hitachi|EX 135UR": [
    "500x92x84"
  ],
  "Hitachi|EX 135VR": [
    "500x92x84"
  ],
  "Hitachi|EX 138UU": [
    "500x92x84"
  ],
  "Hitachi|EX 14": [
    "230x72x42"
  ],
  "Hitachi|EX 14SR": [
    "230x72x42"
  ],
  "Hitachi|EX 15": [
    "230x96x31",
    "230x48x62"
  ],
  "Hitachi|EX 15 (Lotus root)": [
    "230x96x34",
    "230x48x68"
  ],
  "Hitachi|EX 15-1": [
    "230x96x31",
    "230x48x62"
  ],
  "Hitachi|EX 15-2": [
    "230x96x31",
    "230x48x62"
  ],
  "Hitachi|EX 15SR": [
    "200x72x42"
  ],
  "Hitachi|EX 15U": [
    "230x96x31",
    "230x48x62"
  ],
  "Hitachi|EX 15UR": [
    "230x96x35",
    "230x48x70"
  ],
  "Hitachi|EX 16": [
    "230x96x31",
    "230x48x62"
  ],
  "Hitachi|EX 16-2": [
    "230x96x33",
    "230x48x66"
  ],
  "Hitachi|EX 17": [
    "230x96x33",
    "230x48x66"
  ],
  "Hitachi|EX 17-2": [
    "230x96x33",
    "230x48x66"
  ],
  "Hitachi|EX 17-2B": [
    "230x96x33",
    "230x48x66"
  ],
  "Hitachi|EX 17U": [
    "230x96x35",
    "230x48x70"
  ],
  "Hitachi|EX 20-2": [
    "250x52.5x73",
    "300x52.5x72"
  ],
  "Hitachi|EX 20U": [
    "250x96x41",
    "250x47x84",
    "250x48x82"
  ],
  "Hitachi|EX 20U-1": [
    "250x96x41",
    "250x47x84",
    "250x48x82"
  ],
  "Hitachi|EX 20U-3": [
    "250x52.5x76",
    "250x52.5x76",
    "300x52.5x76"
  ],
  "Hitachi|EX 20UR": [
    "250x52.5x76",
    "250x52.5x76",
    "300x52.5x76"
  ],
  "Hitachi|EX 20UR-1": [
    "250x52.5x76",
    "250x52.5x76",
    "300x52.5x76"
  ],
  "Hitachi|EX 20UR-3": [
    "250x52.5x77",
    "250x52.5x77"
  ],
  "Hitachi|EX 21": [
    "250x52.5x73",
    "300x52.5x72"
  ],
  "Hitachi|EX 22": [
    "250x52.5x73",
    "300x52.5x72"
  ],
  "Hitachi|EX 22-1": [
    "250x52.5x73",
    "300x52.5x72"
  ],
  "Hitachi|EX 22-2": [
    "250x52.5x73",
    "300x52.5x72"
  ],
  "Hitachi|EX 24": [
    "300x109x35",
    "300x52.5x72"
  ],
  "Hitachi|EX 24U": [
    "300x52.5x76",
    "250x52.5x76",
    "300x52.5x76"
  ],
  "Hitachi|EX 25": [
    "300x55x74",
    "250x52.5x76",
    "300x52.5x76"
  ],
  "Hitachi|EX 25-1": [
    "300x55x74",
    "250x52.5x76",
    "300x52.5x76"
  ],
  "Hitachi|EX 25-2": [
    "300x52.5x77",
    "250x52.5x76",
    "300x52.5x76"
  ],
  "Hitachi|EX 25U": [
    "300x52.5x78",
    "300x52.5x78"
  ],
  "Hitachi|EX 26": [
    "300x109x37",
    "250x52.5x76",
    "300x52.5x76"
  ],
  "Hitachi|EX 27": [
    "300x109x37",
    "250x52.5x76",
    "300x52.5x76"
  ],
  "Hitachi|EX 27U": [
    "300x52.5x78",
    "300x52.5x78"
  ],
  "Hitachi|EX 29U": [
    "300x52.5x78",
    "300x52.5x78"
  ],
  "Hitachi|EX 29UR": [
    "300x52.5x78",
    "300x52.5x78"
  ],
  "Hitachi|EX 30": [
    "300x55x80",
    "300x52.5x82"
  ],
  "Hitachi|EX 30-1": [
    "300x55x80",
    "300x52.5x82"
  ],
  "Hitachi|EX 30-2": [
    "300x52.5x82",
    "300x52.5x82"
  ],
  "Hitachi|EX 30U Lotus root": [
    "300x55x80",
    "300x52.5x82"
  ],
  "Hitachi|EX 30UR": [
    "300x52.5x76",
    "300x52.5x82"
  ],
  "Hitachi|EX 30UR-1": [
    "300x55x74",
    "300x52.5x76"
  ],
  "Hitachi|EX 30UR-2": [
    "300x55x74",
    "300x52.5x76"
  ],
  "Hitachi|EX 30UR-3": [
    "300x52.5x82",
    "300x52.5x82"
  ],
  "Hitachi|EX 32U": [
    "300x52.5x82",
    "300x52.5x82"
  ],
  "Hitachi|EX 33": [
    "300x109x41",
    "300x52.5x84"
  ],
  "Hitachi|EX 33Mu": [
    "300x52.5x82",
    "300x52.5x82"
  ],
  "Hitachi|EX 33U": [
    "300x55x80",
    "300x52.5x82"
  ],
  "Hitachi|EX 33U-3": [
    "300x55x80",
    "300x52.5x82"
  ],
  "Hitachi|EX 35": [
    "300x55x82",
    "300x52.5x84"
  ],
  "Hitachi|EX 35-1": [
    "300x55x82",
    "300x52.5x84"
  ],
  "Hitachi|EX 35-2": [
    "300x52.5x82",
    "300x52.5x82"
  ],
  "Hitachi|EX 35U": [
    "300x52.5x86",
    "300x52.5x86"
  ],
  "Hitachi|EX 36U": [
    "300x52.5x86",
    "300x52.5x86"
  ],
  "Hitachi|EX 40": [
    "400x72.5x72",
    "400x725x72"
  ],
  "Hitachi|EX 40-2": [
    "400x72.5x72",
    "400x725x72"
  ],
  "Hitachi|EX 40U": [
    "400x72.5x72",
    "400x725x72"
  ],
  "Hitachi|EX 40UR": [
    "300x55x82",
    "300x52.5x84"
  ],
  "Hitachi|EX 40UR-1": [
    "300x55x82",
    "300x52.5x84"
  ],
  "Hitachi|EX 40UR-2": [
    "300x55x82",
    "300x52.5x84"
  ],
  "Hitachi|EX 40URG": [
    "300x55x82",
    "300x52.5x84"
  ],
  "Hitachi|EX 45": [
    "400x72.5x72"
  ],
  "Hitachi|EX 45-2": [
    "400x72.5x72"
  ],
  "Hitachi|EX 50": [
    "400x142x37",
    "400x72.5x72"
  ],
  "Hitachi|EX 50-1": [
    "400x142x37",
    "400x72.5x72"
  ],
  "Hitachi|EX 50-2": [
    "400x72.5x72"
  ],
  "Hitachi|EX 50U": [
    "400x72.5x72"
  ],
  "Hitachi|EX 50UR": [
    "400x72.5x72"
  ],
  "Hitachi|EX 50UR-2": [
    "400x72.5x72"
  ],
  "Hitachi|EX 50URG": [
    "400x72.5x72"
  ],
  "Hitachi|EX 55": [
    "400x72.5x72",
    "400x142x39",
    "400x72.5x76"
  ],
  "Hitachi|EX 55UR": [
    "400x72.5x72"
  ],
  "Hitachi|EX 55UR-2": [
    "400x72.5x72"
  ],
  "Hitachi|EX 55UR-3": [
    "400x72.5x72"
  ],
  "Hitachi|EX 55URG": [
    "400x142x37",
    "400x72.5x72"
  ],
  "Hitachi|EX 58": [
    "400x72.5x74"
  ],
  "Hitachi|EX 58Mu": [
    "400x72.5x74"
  ],
  "Hitachi|EX 60 LC": [
    "450x81x78",
    "450x81x78"
  ],
  "Hitachi|EX 60 LC-2": [
    "450x81x76"
  ],
  "Hitachi|EX 60 LC-3": [
    "450x163x38",
    "450x81x76"
  ],
  "Hitachi|EX 60 LC-5": [
    "450x81x78",
    "450x81x78"
  ],
  "Hitachi|EX 60 URG-2": [
    "450x81x76"
  ],
  "Hitachi|EX 7": [
    "180x72x36"
  ],
  "Hitachi|EX 70U": [
    "450x81x78",
    "450x81x78"
  ],
  "Hitachi|EX 75-2": [
    "450x81x76"
  ],
  "Hitachi|EX 75UR": [
    "450x81x76"
  ],
  "Hitachi|EX 75UR-2": [
    "450x81x76"
  ],
  "Hitachi|EX 75UR-3 (SN < 1530)": [
    "450x81x76"
  ],
  "Hitachi|EX 75UR-3 (SN > 1529)": [
    "450x81x78",
    "450x81x78"
  ],
  "Hitachi|EX 75UR-5": [
    "450x81x78",
    "450x81x78"
  ],
  "Hitachi|EX 75US": [
    "450x81x78",
    "450x81x78"
  ],
  "Hitachi|EX 75US-7 ('2001)": [
    "450x81x78",
    "450x81x78"
  ],
  "Hitachi|EX 8": [
    "180x72x37"
  ],
  "Hitachi|EX 8-1": [
    "180x72x37"
  ],
  "Hitachi|EX 8-2": [
    "180x72x37"
  ],
  "Hitachi|EX 8-2B": [
    "180x72x37"
  ],
  "Hitachi|EX 80U": [
    "450x81.5x76",
    "450x81x78"
  ],
  "Hitachi|Ex 18-2": [
    "250x52.5x73",
    "300x52.5x72"
  ],
  "Hitachi|HE 10": [
    "230x72x42"
  ],
  "Hitachi|HE 15": [
    "230x96x33",
    "230x48x66"
  ],
  "Hitachi|HX 140B (Crane) (OEM400x72.5x72)": [
    "400x72.5x72",
    "400x72.5x78"
  ],
  "Hitachi|HX 64B (Lifting platform)": [
    "250x52.5x76",
    "250x52.5x76",
    "300x52.5x76"
  ],
  "Hitachi|HX 99B (Crane)": [
    "400x72.5x72"
  ],
  "Hitachi|HX 99B (Lifting platform)": [
    "400x72.5x72"
  ],
  "Hitachi|HX 99B-2 (Lifting platform)": [
    "400x72.5x72"
  ],
  "Hitachi|ME 15": [
    "230x96x33",
    "230x48x66"
  ],
  "Hitachi|ME 15S": [
    "230x72x42"
  ],
  "Hitachi|SH 15-2": [
    "230x96x31",
    "230x48x62"
  ],
  "Hitachi|SH 30-2": [
    "300x55x80",
    "300x52.5x82"
  ],
  "Hitachi|SH 40-2": [
    "400x72.5x72"
  ],
  "Hitachi|SH 45-2": [
    "400x72.5x72"
  ],
  "Hitachi|UE 004": [
    "230x72x42"
  ],
  "Hitachi|UE 10": [
    "230x72x42"
  ],
  "Hitachi|UE 12": [
    "230x72x42"
  ],
  "Hitachi|UE 15": [
    "230x72x42",
    "230x72x43"
  ],
  "Hitachi|UE 15SR": [
    "230x72x42",
    "230x72x43"
  ],
  "Hitachi|UE 20": [
    "300x109x35",
    "320x100x38",
    "300x52.5x72"
  ],
  "Hitachi|UE 30 (OEM 300x52.5x84)": [
    "300x52.5x84",
    "320x100x44"
  ],
  "Hitachi|UE 35": [
    "300x109x42",
    "300x52.5x86"
  ],
  "Hitachi|UE 40": [
    "350x109x42",
    "300x52.5x86"
  ],
  "Hitachi|UE 45": [
    "400x72.5x72"
  ],
  "Hitachi|UE 50": [
    "400x72.5x72"
  ],
  "Hitachi|ZE 19": [
    "230x48x70"
  ],
  "Hitachi|ZX 10U": [
    "180x72x41"
  ],
  "Hitachi|ZX 10U-2": [
    "180x72x41"
  ],
  "Hitachi|ZX 135": [
    "500x92x84"
  ],
  "Hitachi|ZX 14-3": [
    "230x96x31",
    "230x48x62"
  ],
  "Hitachi|ZX 16": [
    "230x96x33",
    "230x48x66"
  ],
  "Hitachi|ZX 16-3": [
    "230x48x66"
  ],
  "Hitachi|ZX 16YLR": [
    "230x96x33",
    "230x48x66"
  ],
  "Hitachi|ZX 17U-2": [
    "230x48x70"
  ],
  "Hitachi|ZX 17U-2YLR": [
    "230x96x35",
    "230x48x70"
  ],
  "Hitachi|ZX 17U-5": [
    "230x48x70"
  ],
  "Hitachi|ZX 17U-6": [
    "230x48x70"
  ],
  "Hitachi|ZX 18": [
    "230x96x33",
    "230x48x66"
  ],
  "Hitachi|ZX 18-3": [
    "230x48x70"
  ],
  "Hitachi|ZX 19U-5": [
    "230x48x70"
  ],
  "Hitachi|ZX 19U-6": [
    "230x48x70"
  ],
  "Hitachi|ZX 22U": [
    "250x52.5x77",
    "250x52.5x77"
  ],
  "Hitachi|ZX 22U-2": [
    "250x52.5x77",
    "250x52.5x77"
  ],
  "Hitachi|ZX 25": [
    "250x52.5x73",
    "300x52.5x72"
  ],
  "Hitachi|ZX 25CLR": [
    "250x52.5x73",
    "300x52.5x72"
  ],
  "Hitachi|ZX 26U-5": [
    "300x52.5x80",
    "300x52.5x80"
  ],
  "Hitachi|ZX 27U": [
    "300x52.5x78",
    "300x52.5x78"
  ],
  "Hitachi|ZX 27U-2": [
    "300x52.5x80",
    "300x52.5x80"
  ],
  "Hitachi|ZX 27U-3": [
    "300x52.5x80",
    "300x52.5x80"
  ],
  "Hitachi|ZX 29U": [
    "300x52.5x80",
    "300x52.5x80"
  ],
  "Hitachi|ZX 29U-3": [
    "300x52.5x80",
    "300x52.5x80"
  ],
  "Hitachi|ZX 30": [
    "300x52.5x82",
    "300x52.5x82"
  ],
  "Hitachi|ZX 30U": [
    "300x52.5x86",
    "300x52.5x86"
  ],
  "Hitachi|ZX 30U-2": [
    "300x52.5x86",
    "300x52.5x86"
  ],
  "Hitachi|ZX 30U-3F": [
    "300x52.5x86",
    "300x52.5x86"
  ],
  "Hitachi|ZX 33U": [
    "300x52.5x86",
    "300x52.5x86"
  ],
  "Hitachi|ZX 33U-3": [
    "300x52.5x86",
    "300x52.5x86"
  ],
  "Hitachi|ZX 33U-5": [
    "300x52.5x86",
    "300x52.5x86"
  ],
  "Hitachi|ZX 35": [
    "300x52.5x82",
    "300x52.5x82"
  ],
  "Hitachi|ZX 35U-2": [
    "300x52.5x86",
    "300x52.5x86"
  ],
  "Hitachi|ZX 35U-3": [
    "300x52.5x86",
    "300x52.5x86"
  ],
  "Hitachi|ZX 35U-5": [
    "300x52.5x86",
    "300x52.5x86"
  ],
  "Hitachi|ZX 38U": [
    "300x52.5x86",
    "300x52.5x86"
  ],
  "Hitachi|ZX 38U-3": [
    "300x52.5x86",
    "300x52.5x86"
  ],
  "Hitachi|ZX 38U-5": [
    "300x52.5x86",
    "300x52.5x86"
  ],
  "Hitachi|ZX 40": [
    "400x72.5x72"
  ],
  "Hitachi|ZX 40U": [
    "400x72.5x72"
  ],
  "Hitachi|ZX 40U-2": [
    "400x72.5x74"
  ],
  "Hitachi|ZX 40U-3": [
    "400x72.5x74"
  ],
  "Hitachi|ZX 48 U-3": [
    "400x72.5x74",
    "400x72.5x74"
  ],
  "Hitachi|ZX 48 U-5": [
    "400x72.5x74",
    "400x72.5x74"
  ],
  "Hitachi|ZX 50": [
    "400x72.5x72"
  ],
  "Hitachi|ZX 50U (SN < 7001 )": [
    "400x72.5x72"
  ],
  "Hitachi|ZX 50U (SN > 7000 )": [
    "400x72.5x74",
    "400x72.5x74"
  ],
  "Hitachi|ZX 50U-2": [
    "400x72.5x74",
    "400x72.5x74"
  ],
  "Hitachi|ZX 50U-3": [
    "400x72.5x74",
    "400x72.5x74"
  ],
  "Hitachi|ZX 50U-5": [
    "400x72.5x74",
    "400x72.5x74"
  ],
  "Hitachi|ZX 52U": [
    "400x72.5x74",
    "400x72.5x74"
  ],
  "Hitachi|ZX 52U-3": [
    "400x72.5x74",
    "400x72.5x74"
  ],
  "Hitachi|ZX 55U": [
    "400x72.5x72"
  ],
  "Hitachi|ZX 55U-5": [
    "400x72.5x74"
  ],
  "Hitachi|ZX 55U-6": [
    "400x72.5x74",
    "400x72.5x74"
  ],
  "Hitachi|ZX 60U-3": [
    "400x72.5x74"
  ],
  "Hitachi|ZX 60U-5": [
    "400x72.5x74"
  ],
  "Hitachi|ZX 60USB": [
    "400x72.5x74"
  ],
  "Hitachi|ZX 60USB-3": [
    "400x72.5x74"
  ],
  "Hitachi|ZX 60USB-5N": [
    "400x72.5x74"
  ],
  "Hitachi|ZX 65U-5": [
    "400x72.5x74"
  ],
  "Hitachi|ZX 65USB-6": [
    "400x72.5x74"
  ],
  "Hitachi|ZX 70LC": [
    "450x81x78",
    "450x81x78"
  ],
  "Hitachi|ZX 75US": [
    "450x81.5x76",
    "450x81x76"
  ],
  "Hitachi|ZX 8-2": [
    "180x72x37"
  ],
  "Hitachi|ZX 80LC": [
    "450x81x78",
    "450x81x78"
  ],
  "Hitachi|ZX 85": [
    "450x81x78",
    "450x81x78"
  ],
  "Hitachi|ZX 85US": [
    "450x81x78",
    "450x81x78"
  ],
  "Hitachi|ZX 85US-3": [
    "450x81x78",
    "450x81x78"
  ],
  "Hitachi|ZX 85US-5A": [
    "450x81x78",
    "450x81x78"
  ],
  "Hokuetsu|HM 07S": [
    "180x72x36"
  ],
  "Hokuetsu|HM 10": [
    "200x72x42"
  ],
  "Hokuetsu|HM 10G": [
    "200x72x42"
  ],
  "Hokuetsu|HM 10SG": [
    "200x72x42"
  ],
  "Hokuetsu|HM 15": [
    "200x72x42"
  ],
  "Hokuetsu|HM 15S": [
    "200x72x42"
  ],
  "Hokuetsu|HM 30SZG": [
    "300x109x40",
    "300x52.5x82"
  ],
  "Hokuetsu|HM 45": [
    "400x146x36",
    "400x72.5x72"
  ],
  "Holmac|HM 200": [
    "200x72x37"
  ],
  "Holmac|HZC 16-22": [
    "200x72x37",
    "180x72x37"
  ],
  "Holmac|HZC 24": [
    "230x72x37"
  ],
  "Holmac|HZC 25": [
    "230x72x37"
  ],
  "Holmac|HZC 26-20": [
    "230x72x43"
  ],
  "Holmac|HZC 26TL (Long side)": [
    "200x72x42"
  ],
  "Holmac|HZC 26TL (Short side)": [
    "200x72x37",
    "180x72x37"
  ],
  "Holmac|HZC 29 2X": [
    "230x72x43"
  ],
  "Holmac|HZC 35": [
    "300x72x45",
    "250x72x45"
  ],
  "Holmac|HZC 35T": [
    "300x72x45",
    "250x72x45"
  ],
  "Holmac|HZC 37": [
    "300x72x45",
    "250x72x45"
  ],
  "Holman|R 13700": [
    "230x72x43"
  ],
  "Holmed|Mini-excavator": [
    "200x72x36",
    "180x72x36"
  ],
  "Honda|B 114": [
    "180x60x30"
  ],
  "Honda|B 415": [
    "180x60x37"
  ],
  "Honda|HP 250 (carrier) [OEM 180x60x30]": [
    "180x60x30",
    "180x60x34",
    "180x60x37"
  ],
  "Honda|HP 350 (carrier) [OEM 180x60x34]": [
    "180x60x34"
  ],
  "Honda|HP 400 (carrier) [OEM 180x60x37]": [
    "180x60x37",
    "180x72x34"
  ],
  "Honda|HP 500 (carrier) [OEM 180x60x37]": [
    "180x60x37",
    "230x72x37"
  ],
  "Honda|HP 510 (carrier)": [
    "180x60x37"
  ],
  "Honda|HP 515 (carrier)": [
    "180x60x37"
  ],
  "Honda|HP 516 (carrier)": [
    "180x60x37"
  ],
  "Honda|HP 800A (mini dumper)": [
    "180x72x34"
  ],
  "Honda|SC 156DD (Carrier)": [
    "180x60x34"
  ],
  "Honda|SC 433 (Carrier)": [
    "200x72x35",
    "180x72x35"
  ],
  "Huki|110 (Dumper)": [
    "230x72x47"
  ],
  "Huki|120H (Dumper)": [
    "250x72x52"
  ],
  "Huki|130 (Dumper)": [
    "250x72x48"
  ],
  "Huki|150 (Dumper)": [
    "250x72x52"
  ],
  "Huki|150R (Dumper)": [
    "250x72x48"
  ],
  "Huki|150S (Dumper)": [
    "250x72x48"
  ],
  "Huki|700-2 (Dumper)": [
    "700x100x98"
  ],
  "Huki|80 (Dumper)": [
    "230x72x43"
  ],
  "Huki|D 50": [
    "200x72x34",
    "180x72x34"
  ],
  "Husqvarna|DXR 140": [
    "180x72x35"
  ],
  "Husqvarna|DXR 270": [
    "230x72x43"
  ],
  "Husqvarna|DXR 300": [
    "230x72x43"
  ],
  "Husqvarna|DXR 310": [
    "230x72x43"
  ],
  "Husqvarna|DXR250": [
    "230x72x37"
  ],
  "Hutte|HBR 202TF": [
    "250x72x57"
  ],
  "Hutter|14 G2": [
    "230x72x43"
  ],
  "Hydra|9 / 2 (Sky lifter)": [
    "180x60x38"
  ],
  "Hydra|JOY 1 (Drilling machine)": [
    "230x72x43"
  ],
  "Hydra|JOY 2 (Drilling machine)": [
    "250x72x52"
  ],
  "Hydramac|H 15": [
    "230x72x43"
  ],
  "Hydramac|H 20": [
    "230x72x43"
  ],
  "Hydro Rain|EUROPA H20": [
    "230x72x43"
  ],
  "Hyundai|HX10A": [
    "180x72x37"
  ],
  "Hyundai|R 35 Z-9": [
    "300x52.5x86",
    "300x52.5x86"
  ],
  "Hyundai|Robex 15-5": [
    "230x48x66",
    "230x96x33"
  ],
  "Hyundai|Robex 15-7": [
    "230x48x66",
    "230x96x33"
  ],
  "Hyundai|Robex 16-7": [
    "230x48x66",
    "230x96x33"
  ],
  "Hyundai|Robex 16-9": [
    "230x48x70"
  ],
  "Hyundai|Robex 17z-9a": [
    "230x48x70"
  ],
  "Hyundai|Robex 18-9": [
    "230x48x70"
  ],
  "Hyundai|Robex 25z-9ak": [
    "250x52.5x78",
    "250x52.5x78"
  ],
  "Hyundai|Robex 27Z-9": [
    "300x52.5x80",
    "300x52.5x80"
  ],
  "Hyundai|Robex 28-5": [
    "300x52.5x74",
    "300x52.5x74"
  ],
  "Hyundai|Robex 30": [
    "300x55x78",
    "300x52.5x80"
  ],
  "Hyundai|Robex 30z-9a": [
    "300x52.5x80",
    "300x52.5x80"
  ],
  "Hyundai|Robex 30z-9ak": [
    "300x52.5x80",
    "300x52.5x80"
  ],
  "Hyundai|Robex 35-9": [
    "300x52.5x86",
    "300x52.5x86"
  ],
  "Hyundai|Robex 35Z-7A": [
    "300x52.5x86",
    "300x52.5x86"
  ],
  "Hyundai|Robex 35z-9a": [
    "300x52.5x86"
  ],
  "Hyundai|Robex 35z-9ak": [
    "300x52.5x86"
  ],
  "Hyundai|Robex 36-7": [
    "300x52.5x84",
    "300x52.5x84"
  ],
  "Hyundai|Robex 55-3": [
    "400x73x76",
    "400x72.5x76"
  ],
  "Hyundai|Robex 55-7": [
    "400x73x76",
    "400x72.5x76"
  ],
  "Hyundai|Robex 55-9": [
    "400x73x76",
    "400x72.5x76"
  ],
  "Hyundai|Robex 55-9a": [
    "400x73x76",
    "400x72.5x76"
  ],
  "Hyundai|Robex 60cr-9a": [
    "400x73x76",
    "400x72.5x76"
  ],
  "Hyundai|Robex 75-7": [
    "450x71x86"
  ],
  "Hyundai|Robex 80CR-9": [
    "450x83.5x74",
    "450x81x76"
  ],
  "Hyundai|Robex R60 CR-9": [
    "400x73x76",
    "400x72.5x76"
  ],
  "ICE(Internationalstruction Equipment INC|TD 308 (>2004 model)": [
    "230x96x33",
    "230x48x66"
  ],
  "IHI|102 (dumper) ('2002)": [
    "180x72x34"
  ],
  "IHI|102R (dumper) ('2002)": [
    "180x72x37"
  ],
  "IHI|103 (dumper) ('2002)": [
    "180x72x37"
  ],
  "IHI|103E (dumper) ('2002)": [
    "180x72x37"
  ],
  "IHI|107 (Carrier)": [
    "200x72x37",
    "180x72x37"
  ],
  "IHI|10Z": [
    "230x72x47"
  ],
  "IHI|12J": [
    "230x72x47"
  ],
  "IHI|12JX": [
    "230x72x47"
  ],
  "IHI|12NX": [
    "230x72x47"
  ],
  "IHI|12VXE": [
    "200x72x40"
  ],
  "IHI|14NXT": [
    "230x96x32",
    "230x48x64"
  ],
  "IHI|15J": [
    "230x96x32",
    "230x48x64"
  ],
  "IHI|15NX": [
    "230x96x35",
    "230x48x70"
  ],
  "IHI|16N": [
    "230x96x32",
    "230x48x64"
  ],
  "IHI|16NXT": [
    "230x96x35",
    "230x48x70"
  ],
  "IHI|17J": [
    "230x96x32",
    "230x48x64"
  ],
  "IHI|17NE('2002)": [
    "230x96x32",
    "230x48x64"
  ],
  "IHI|17VXE": [
    "230x96x35",
    "230x48x70"
  ],
  "IHI|18J": [
    "230x96x35",
    "230x48x70"
  ],
  "IHI|18N": [
    "230x96x35",
    "230x48x70"
  ],
  "IHI|18NXT": [
    "230x96x35",
    "230x48x70"
  ],
  "IHI|19VXT": [
    "230x96x35",
    "230x48x70"
  ],
  "IHI|20JX": [
    "250x96x40",
    "250x48x80"
  ],
  "IHI|20NX": [
    "250x96x40",
    "250x48x80"
  ],
  "IHI|20NX-2": [
    "250x96x40",
    "250x48x80"
  ],
  "IHI|20Z": [
    "250x96x40",
    "250x48x80"
  ],
  "IHI|22UX": [
    "300x109x39",
    "300x52.5x80"
  ],
  "IHI|25J": [
    "300x52.5x72"
  ],
  "IHI|25JX": [
    "300x52.5x76"
  ],
  "IHI|25NX": [
    "300x52.5x78"
  ],
  "IHI|25VX": [
    "300x52.5x78"
  ],
  "IHI|27V4": [
    "250x52.5x78",
    "300x52.5x78"
  ],
  "IHI|28J": [
    "300x52.5x76"
  ],
  "IHI|28N": [
    "300x52.5x78"
  ],
  "IHI|28N-2": [
    "300x52.5x78"
  ],
  "IHI|28N-3": [
    "300x52.5x78"
  ],
  "IHI|28UX": [
    "300x109x39",
    "300x52.5x80"
  ],
  "IHI|30J": [
    "300x52.5x80"
  ],
  "IHI|30JX": [
    "300x52.5x84"
  ],
  "IHI|30NX": [
    "300x52.5x84"
  ],
  "IHI|30NX-2": [
    "300x55x82",
    "300x52.5x84"
  ],
  "IHI|30UJ": [
    "300x52.5x80"
  ],
  "IHI|30UX": [
    "300x52.5x84"
  ],
  "IHI|30V4": [
    "300x52.5x84"
  ],
  "IHI|30VX": [
    "300x55x82",
    "300x52.5x84"
  ],
  "IHI|30Z": [
    "300x52.5x80"
  ],
  "IHI|32J": [
    "300x52.5x84"
  ],
  "IHI|35FX": [
    "300x52.5x90"
  ],
  "IHI|35J": [
    "300x52.5x84"
  ],
  "IHI|35JX": [
    "300x52.5x90"
  ],
  "IHI|35N": [
    "300x52.5x84"
  ],
  "IHI|35NX": [
    "300x52.5x90"
  ],
  "IHI|35NX-2": [
    "300x52.5x90"
  ],
  "IHI|35UJ": [
    "300x52.5x90"
  ],
  "IHI|35VX": [
    "300x55x88",
    "300x52.5x90"
  ],
  "IHI|38N": [
    "350x52.5x84",
    "300x52.5x84"
  ],
  "IHI|38UJ": [
    "300x52.5x90"
  ],
  "IHI|40G-1": [
    "400x73x70",
    "400x72.5x72"
  ],
  "IHI|40GX-2": [
    "400x72.5x72"
  ],
  "IHI|40J": [
    "400x73x70",
    "400x72.5x72"
  ],
  "IHI|40JX": [
    "400x73x70",
    "400x72.5x72"
  ],
  "IHI|40NX": [
    "400x73x70",
    "400x72.5x72"
  ],
  "IHI|40Z": [
    "300x52.5x90"
  ],
  "IHI|45J": [
    "400x73x72",
    "400x72.5x72"
  ],
  "IHI|45J-2": [
    "400x73x72",
    "400x72.5x72"
  ],
  "IHI|45N": [
    "400x72.5x72"
  ],
  "IHI|45NX": [
    "400x72.5x72"
  ],
  "IHI|45UJ": [
    "400x73x72",
    "400x72.5x72"
  ],
  "IHI|45UJ-2": [
    "400x73x72",
    "400x72.5x72"
  ],
  "IHI|45V4": [
    "400x72.5x74"
  ],
  "IHI|50J": [
    "400x73x74",
    "400x72.5x74"
  ],
  "IHI|50NX": [
    "400x72.5x72"
  ],
  "IHI|50UX": [
    "400x73x74",
    "400x72.5x74"
  ],
  "IHI|50VX": [
    "400x72.5x74"
  ],
  "IHI|50Z": [
    "400x73x74",
    "400x72.5x74"
  ],
  "IHI|55J": [
    "400x73x74",
    "400x72.5x74"
  ],
  "IHI|55J-2": [
    "400x73x74",
    "400x72.5x74"
  ],
  "IHI|55N": [
    "400x73x74",
    "400x72.5x74"
  ],
  "IHI|55UJ": [
    "400x73x74",
    "400x72.5x74"
  ],
  "IHI|55UX": [
    "400x73x74",
    "400x72.5x74"
  ],
  "IHI|55V4": [
    "400x72.5x74"
  ],
  "IHI|55VX": [
    "400x72.5x74"
  ],
  "IHI|55VX-3": [
    "400x72.5x74"
  ],
  "IHI|60V4": [
    "400x72.5x74"
  ],
  "IHI|65NX": [
    "400x73x82",
    "400x72.5x82"
  ],
  "IHI|65UJ": [
    "450x71x82"
  ],
  "IHI|65UX": [
    "400x73x82",
    "400x72.5x82"
  ],
  "IHI|65VX": [
    "400x73x82",
    "400x72.5x82"
  ],
  "IHI|65VX-2": [
    "400x73x82",
    "400x72.5x82"
  ],
  "IHI|70Z": [
    "450x71x82"
  ],
  "IHI|75NX": [
    "450x71x82"
  ],
  "IHI|75UJ": [
    "450x71x82"
  ],
  "IHI|7GX": [
    "180x72x37"
  ],
  "IHI|7J": [
    "180x72x37"
  ],
  "IHI|7JE": [
    "180x72x37"
  ],
  "IHI|80NX": [
    "450x71x82"
  ],
  "IHI|80NX-3": [
    "450x71x82"
  ],
  "IHI|80VX": [
    "450x71x82"
  ],
  "IHI|80VX-3": [
    "450x71x82"
  ],
  "IHI|85V-4": [
    "450x71x82"
  ],
  "IHI|9NX": [
    "180x72x37"
  ],
  "IHI|9VX": [
    "180x72x37"
  ],
  "IHI|CARRY 105": [
    "180x72x34"
  ],
  "IHI|CARRY 107": [
    "180x72x37"
  ],
  "IHI|CARRY 110": [
    "200x72x44",
    "180x72x44"
  ],
  "IHI|CCH 30T(Minicare)": [
    "300x52.5x90"
  ],
  "IHI|CCH 30T(pick ace crane)": [
    "300x52.5x90"
  ],
  "IHI|IM R15": [
    "230x72x47"
  ],
  "IHI|IS 07": [
    "180x72x37"
  ],
  "IHI|IS 10": [
    "230x72x43"
  ],
  "IHI|IS 10C": [
    "230x72x43"
  ],
  "IHI|IS 10F": [
    "230x72x43"
  ],
  "IHI|IS 10FX": [
    "230x72x43"
  ],
  "IHI|IS 10G": [
    "230x72x43"
  ],
  "IHI|IS 10GX": [
    "230x72x43"
  ],
  "IHI|IS 10S": [
    "230x72x43"
  ],
  "IHI|IS 10Z": [
    "230x72x47"
  ],
  "IHI|IS 11X": [
    "230x72x43"
  ],
  "IHI|IS 12": [
    "230x72x43"
  ],
  "IHI|IS 12C": [
    "230x72x43"
  ],
  "IHI|IS 12G": [
    "230x72x43"
  ],
  "IHI|IS 12GX": [
    "230x72x43"
  ],
  "IHI|IS 12JX": [
    "230x72x47"
  ],
  "IHI|IS 12NX": [
    "230x72x47"
  ],
  "IHI|IS 12S": [
    "230x72x43"
  ],
  "IHI|IS 14": [
    "230x72x43"
  ],
  "IHI|IS 14G": [
    "230x72x43"
  ],
  "IHI|IS 14GX": [
    "230x72x43"
  ],
  "IHI|IS 14GX-2": [
    "230x72x43"
  ],
  "IHI|IS 14GX-3": [
    "230x72x43"
  ],
  "IHI|IS 14PX": [
    "230x72x43"
  ],
  "IHI|IS 15J": [
    "230x96x32",
    "230x48x64"
  ],
  "IHI|IS 17J": [
    "230x96x32",
    "230x48x64"
  ],
  "IHI|IS 17JE": [
    "230x96x32",
    "230x48x64"
  ],
  "IHI|IS 18J": [
    "230x96x35",
    "230x48x70"
  ],
  "IHI|IS 18UJ": [
    "250x96x40",
    "250x48x80"
  ],
  "IHI|IS 20JX": [
    "250x96x40",
    "250x48x80"
  ],
  "IHI|IS 20LX": [
    "300x109x37",
    "300x52.5x76"
  ],
  "IHI|IS 22UX": [
    "300x109x39",
    "300x52.5x80"
  ],
  "IHI|IS 25G": [
    "300x52.5x72"
  ],
  "IHI|IS 25GX": [
    "300x52.5x72"
  ],
  "IHI|IS 25J": [
    "300x52.5x72"
  ],
  "IHI|IS 25JX": [
    "300x52.5x76"
  ],
  "IHI|IS 25NX": [
    "300x52.5x76"
  ],
  "IHI|IS 27": [
    "300x109x37",
    "300x52.5x76"
  ],
  "IHI|IS 27G": [
    "300x109x37",
    "300x52.5x76"
  ],
  "IHI|IS 27GX": [
    "300x109x37",
    "300x52.5x76"
  ],
  "IHI|IS 28": [
    "300x109x37",
    "300x52.5x76"
  ],
  "IHI|IS 28G": [
    "300x52.5x76"
  ],
  "IHI|IS 28G3": [
    "300x52.5x76"
  ],
  "IHI|IS 28GX": [
    "300x52.5x76"
  ],
  "IHI|IS 28J": [
    "300x52.5x76"
  ],
  "IHI|IS 28JX": [
    "300x52.5x76"
  ],
  "IHI|IS 28LX": [
    "300x109x37",
    "300x52.5x76"
  ],
  "IHI|IS 28PX": [
    "300x52.5x76"
  ],
  "IHI|IS 28UX": [
    "300x52.5x80"
  ],
  "IHI|IS 28UX-2": [
    "300x52.5x80"
  ],
  "IHI|IS 30G": [
    "300x52.5x80"
  ],
  "IHI|IS 30GX": [
    "300x52.5x80"
  ],
  "IHI|IS 30GX-2": [
    "300x52.5x80"
  ],
  "IHI|IS 30GX-3": [
    "300x52.5x80"
  ],
  "IHI|IS 30J": [
    "300x52.5x80"
  ],
  "IHI|IS 30JX": [
    "300x52.5x84"
  ],
  "IHI|IS 30NX": [
    "300x52.5x84"
  ],
  "IHI|IS 30NX-2": [
    "300x55x82",
    "300x52.5x84"
  ],
  "IHI|IS 30UJ": [
    "300x52.5x80"
  ],
  "IHI|IS 30UJ-2": [
    "300x52.5x80"
  ],
  "IHI|IS 30Z": [
    "300x52.5x80"
  ],
  "IHI|IS 32J": [
    "300x52.5x84"
  ],
  "IHI|IS 35G": [
    "300x52.5x84"
  ],
  "IHI|IS 35G-1": [
    "300x52.5x84"
  ],
  "IHI|IS 35G-2": [
    "300x52.5x84"
  ],
  "IHI|IS 35GX": [
    "300x52.5x84"
  ],
  "IHI|IS 35GX-1": [
    "300x52.5x84"
  ],
  "IHI|IS 35GX-2": [
    "300x52.5x84"
  ],
  "IHI|IS 35GX-3": [
    "300x52.5x84"
  ],
  "IHI|IS 35J": [
    "300x52.5x84"
  ],
  "IHI|IS 35JX": [
    "300x52.5x90"
  ],
  "IHI|IS 35NX": [
    "300x52.5x90"
  ],
  "IHI|IS 35UJ": [
    "300x52.5x90"
  ],
  "IHI|IS 38UJ": [
    "300x52.5x90"
  ],
  "IHI|IS 38UX": [
    "300x109x39",
    "300x52.5x80"
  ],
  "IHI|IS 40J": [
    "400x73x70",
    "400x72.5x70"
  ],
  "IHI|IS 40JX": [
    "400x73x72",
    "400x72.5x72"
  ],
  "IHI|IS 40NX": [
    "400x73x72",
    "400x72.5x72"
  ],
  "IHI|IS 40UJ": [
    "300x52.5x90"
  ],
  "IHI|IS 40Z": [
    "300x52.5x90"
  ],
  "IHI|IS 45J": [
    "400x73x72",
    "400x72.5x72"
  ],
  "IHI|IS 45NX": [
    "400x73x72",
    "400x72.5x72"
  ],
  "IHI|IS 45UJ": [
    "400x73x72",
    "400x72.5x72"
  ],
  "IHI|IS 50G": [
    "400x73x74",
    "400x72.5x74"
  ],
  "IHI|IS 50G3": [
    "400x73x74",
    "400x72.5x74"
  ],
  "IHI|IS 50GX": [
    "400x73x74",
    "400x72.5x74"
  ],
  "IHI|IS 50UJ": [
    "400x73x74",
    "400x72.5x74"
  ],
  "IHI|IS 50UX": [
    "400x73x74",
    "400x72.5x74"
  ],
  "IHI|IS 50Z": [
    "400x73x74",
    "400x72.5x74"
  ],
  "IHI|IS 55": [
    "400x73x74",
    "400x72.5x74"
  ],
  "IHI|IS 55G": [
    "400x73x74",
    "400x72.5x74"
  ],
  "IHI|IS 55G-3": [
    "400x73x74",
    "400x72.5x74"
  ],
  "IHI|IS 55J": [
    "400x73x74",
    "400x72.5x74"
  ],
  "IHI|IS 55LX": [
    "400x73x74",
    "400x72.5x74"
  ],
  "IHI|IS 55N": [
    "400x73x74",
    "400x72.5x74"
  ],
  "IHI|IS 55U-1": [
    "400x73x72",
    "400x72.5x72"
  ],
  "IHI|IS 55U-2": [
    "400x73x72",
    "400x72.5x72"
  ],
  "IHI|IS 55UJ": [
    "400x73x74",
    "400x72.5x74"
  ],
  "IHI|IS 55UX": [
    "400x73x74",
    "400x72.5x74"
  ],
  "IHI|IS 65UJ": [
    "450x71x82",
    "450x71x182"
  ],
  "IHI|IS 65UJ3": [
    "450x71x82",
    "450x71x182"
  ],
  "IHI|IS 70Z": [
    "450x71x82",
    "450x71x182"
  ],
  "IHI|IS 75F": [
    "450x145x40",
    "450x71x82"
  ],
  "IHI|IS 75F UJ": [
    "450x73x80",
    "450x71x82"
  ],
  "IHI|IS 7FX": [
    "180x72x37"
  ],
  "IHI|IS 7GX": [
    "180x72x37"
  ],
  "IHI|IS 7GX-2": [
    "180x72x37"
  ],
  "IHI|IS 7GX-3": [
    "180x72x37"
  ],
  "IHI|IS 7J": [
    "180x72x37"
  ],
  "IHI|IS 7P": [
    "180x72x37"
  ],
  "IHI|IS 80NX": [
    "450x73x80",
    "450x71x82"
  ],
  "IHI|IS9UX-2 (S/N > 1592000)": [
    "230x72x47"
  ],
  "IHI|IS9UX-3": [
    "230x72x47"
  ],
  "IHI|MC 15": [
    "230x72x52"
  ],
  "IHI|T 840": [
    "350x108x42",
    "350x52.5x86"
  ],
  "INOVA|INOVA": [
    "320x100x52"
  ],
  "Imai|SPD 265C": [
    "230x72x43"
  ],
  "Imai|SPD 360C": [
    "230x72x43"
  ],
  "Imef|HE 1.15": [
    "230x72x43"
  ],
  "Imef|HE 12": [
    "230x72x43"
  ],
  "Imef|HE 14": [
    "230x72x43"
  ],
  "Imef|HE 14S": [
    "230x72x43"
  ],
  "Imef|HE 16": [
    "230x72x43"
  ],
  "Imef|HE 16S": [
    "230x72x43"
  ],
  "Imef|HE 18": [
    "230x72x48"
  ],
  "Imef|HE 185": [
    "230x72x48",
    "250x72x48"
  ],
  "Imef|HE 18S": [
    "230x72x48"
  ],
  "Imef|HE 230": [
    "320x100x43",
    "350x109x44",
    "350x52.5x90"
  ],
  "Imef|HE 31": [
    "350x109x44",
    "350x52.5x90"
  ],
  "Imef|HE 32": [
    "350x109x44",
    "350x52.5x90"
  ],
  "Imef|HT 6.01 (Carrier)": [
    "180x72x34"
  ],
  "Imer|CC 1500": [
    "280x72x48",
    "250x72x48"
  ],
  "Imer|CC 450": [
    "180x60x37"
  ],
  "Imer|CC 600": [
    "200x72x34",
    "180x72x34"
  ],
  "Imer|CC 800": [
    "230x72x42"
  ],
  "Imer|IM R19": [
    "200x72x47"
  ],
  "Italmec|Platform": [
    "250x72x57"
  ],
  "JCB|100C-1": [
    "450x81.5x78",
    "450x81x78"
  ],
  "JCB|16C-1": [
    "230x48x70"
  ],
  "JCB|18Z-1": [
    "230x48x70"
  ],
  "JCB|19C-1": [
    "230x48x70"
  ],
  "JCB|35Z-1": [
    "300x52.5x84"
  ],
  "JCB|45Z-1": [
    "350x73x74",
    "400x72.5x74"
  ],
  "JCB|48Z-1": [
    "400x72.5x74"
  ],
  "JCB|51R-1": [
    "400x72.5x74"
  ],
  "JCB|55Z-1": [
    "400x72.5x74"
  ],
  "JCB|57C-1": [
    "400x72.5x74"
  ],
  "JCB|65R": [
    "400x73x74",
    "400x72.5x74"
  ],
  "JCB|67C": [
    "400x73x74",
    "400x72.5x74"
  ],
  "JCB|8008 'Micro 800'": [
    "180x72x35"
  ],
  "JCB|8008CTS": [
    "180x72x35"
  ],
  "JCB|801 (S/N<649729)": [
    "230x72x42"
  ],
  "JCB|801 (S/N>649730)": [
    "230x96x31",
    "230x48x62"
  ],
  "JCB|801,2ZTS": [
    "200x96x31",
    "230x48x62"
  ],
  "JCB|801,7 (S/N > 649730)": [
    "230x96x31",
    "230x48x62"
  ],
  "JCB|801.4": [
    "230x96x31",
    "230x48x62"
  ],
  "JCB|801.5": [
    "230x96x31",
    "230x48x62"
  ],
  "JCB|801.6": [
    "230x96x31",
    "230x48x62"
  ],
  "JCB|801.8": [
    "230x96x31",
    "230x48x62"
  ],
  "JCB|8010 'Micro 1000'": [
    "180x72x37"
  ],
  "JCB|8012 'Micro 1000'": [
    "200x96x31",
    "230x48x62"
  ],
  "JCB|8013": [
    "230x96x31",
    "230x48x62"
  ],
  "JCB|8014": [
    "230x96x31",
    "230x48x62"
  ],
  "JCB|8014 ('05/2005 - SN: 1156000)": [
    "230x96x31",
    "230x48x62"
  ],
  "JCB|8014 CTS": [
    "230x96x31",
    "230x48x62"
  ],
  "JCB|8014 Super": [
    "230x96x31",
    "230x48x62"
  ],
  "JCB|8015": [
    "230x96x31",
    "230x48x62"
  ],
  "JCB|8015-2": [
    "230x96x31",
    "230x48x62"
  ],
  "JCB|8016": [
    "230x96x31",
    "230x48x62"
  ],
  "JCB|8016 ('05/2005 - SN: 1155000 - 115 5334)": [
    "230x96x33",
    "230x48x66"
  ],
  "JCB|8016 Super": [
    "230x96x33",
    "230x48x66"
  ],
  "JCB|8017": [
    "230x96x31",
    "230x48x62"
  ],
  "JCB|8018": [
    "230x96x31",
    "230x48x62"
  ],
  "JCB|8018 CTS": [
    "230x48x66"
  ],
  "JCB|8018 Super": [
    "230x96x33",
    "230x48x66"
  ],
  "JCB|8018 TG": [
    "230x96x31",
    "230x48x62"
  ],
  "JCB|8018 ZTS": [
    "230x96x33",
    "230x48x66"
  ],
  "JCB|8018X ('05/2005 - SN 1046000)": [
    "230x96x33",
    "230x48x66"
  ],
  "JCB|801FDI": [
    "230x72x42"
  ],
  "JCB|801R (models &gt; 02/'93)": [
    "230x96x31",
    "230x48x62"
  ],
  "JCB|801R (models &lt; 02/'93)": [
    "230x72x42"
  ],
  "JCB|802": [
    "250x109x35",
    "250x109x36",
    "300x52.5x72",
    "300x52.5x74"
  ],
  "JCB|802 Plus": [
    "250x109x36",
    "300x52.5x74"
  ],
  "JCB|802 Super": [
    "250x109x36",
    "300x52.5x74"
  ],
  "JCB|802,7 ZTS": [
    "300x109x41",
    "300x52.5x84"
  ],
  "JCB|802.4": [
    "250x109x36",
    "300x52.5x74"
  ],
  "JCB|802.7": [
    "300x109x36",
    "300x52.5x74"
  ],
  "JCB|802.7 Plus": [
    "300x109x36",
    "300x52.5x74"
  ],
  "JCB|8020": [
    "250x96x38",
    "250x48x76"
  ],
  "JCB|8020CTS": [
    "250x96x38",
    "250x48x76"
  ],
  "JCB|8025ZTS": [
    "250x96x38",
    "250x48x76"
  ],
  "JCB|8025ZTS(Long)": [
    "250x109x41",
    "300x52.5x84"
  ],
  "JCB|8026": [
    "250x52.5x78",
    "300x52.5x78"
  ],
  "JCB|8026CTS": [
    "250x52.5x78",
    "300x52.5x78"
  ],
  "JCB|8027Z('2002)": [
    "250x109x41",
    "300x52.5x84"
  ],
  "JCB|8027ZTS": [
    "250x109x41",
    "300x52.5x84"
  ],
  "JCB|8029CTS": [
    "250x52.5x78",
    "300x52.5x78"
  ],
  "JCB|803": [
    "300x109x41",
    "300x52.5x84"
  ],
  "JCB|803 Magnum": [
    "300x109x41",
    "300x52.5x84"
  ],
  "JCB|803 Plus": [
    "300x109x41",
    "300x52.5x84"
  ],
  "JCB|803 Super": [
    "300x109x41",
    "300x52.5x84"
  ],
  "JCB|803,2ZTS": [
    "300x109x41",
    "300x52.5x84"
  ],
  "JCB|8030ZTS": [
    "300x109x41",
    "300x52.5x84"
  ],
  "JCB|8032Z('2002)": [
    "300x109x41",
    "300x52.5x84"
  ],
  "JCB|8032ZTS": [
    "300x109x41",
    "300x52.5x84"
  ],
  "JCB|8035Z": [
    "300x109x43",
    "300x52.5x88"
  ],
  "JCB|803E": [
    "300x109x41",
    "300x52.5x84"
  ],
  "JCB|804": [
    "350x108x41",
    "350x52.5x84"
  ],
  "JCB|804 Plus": [
    "350x108x41",
    "350x52.5x84"
  ],
  "JCB|804 Super": [
    "350x108x41",
    "350x52.5x84"
  ],
  "JCB|8040ZTS": [
    "400x72.5x70",
    "400x72.5x70"
  ],
  "JCB|8045ZTS": [
    "400x72.5x74"
  ],
  "JCB|805": [
    "400x73x74",
    "400x72.5x74"
  ],
  "JCB|805.2": [
    "400x73x74",
    "400x72.5x74"
  ],
  "JCB|8050ZTS": [
    "400x73x74",
    "400x72.5x74"
  ],
  "JCB|8052": [
    "400x73x74",
    "400x72.5x74"
  ],
  "JCB|8055RTS": [
    "400x73x74",
    "400x72.5x74"
  ],
  "JCB|8055Z": [
    "400x73x74",
    "400x72.5x74"
  ],
  "JCB|8055ZTS": [
    "400x73x74",
    "400x72.5x74"
  ],
  "JCB|8056": [
    "400x73x74",
    "400x72.5x74"
  ],
  "JCB|806": [
    "400x73x74",
    "400x72.5x74"
  ],
  "JCB|8060": [
    "400x73x74",
    "400x72.5x74"
  ],
  "JCB|8065RTS": [
    "400x73x74",
    "400x72.5x74"
  ],
  "JCB|8080ZTS": [
    "450x81.5x76",
    "450x81x76"
  ],
  "JCB|8085ZTS": [
    "450x81.5x76",
    "450x81x76"
  ],
  "JCB|85Z-1": [
    "450x81.5x78",
    "450x81x78"
  ],
  "JCB|86C-1": [
    "450x81.5x78",
    "450x81x78"
  ],
  "JCB|90Z-1": [
    "450x81.5x78",
    "450x81x78"
  ],
  "JCB|Dumpster": [
    "180x72x35"
  ],
  "JCB|JS 70": [
    "450x73.5x80",
    "450x71x82"
  ],
  "JCB|JZ 70": [
    "450x81x76",
    "450x81x76"
  ],
  "JCB|MTl 200": [
    "180x72x37"
  ],
  "JCB|Micro": [
    "180x72x37"
  ],
  "JCB|Micro 8008": [
    "180x72x35"
  ],
  "JCB|Micro Light": [
    "180x72x35"
  ],
  "JCB|Micro Plus": [
    "230x96x31",
    "230x48x62"
  ],
  "JCB|TD 10(Dumper)": [
    "180x72x37"
  ],
  "JCB|TD 10SL(Dumper)": [
    "180x72x37"
  ],
  "JCB|TD 7(Dumper)": [
    "180x72x37"
  ],
  "JIEHE|JHZA-25": [
    "200x72x39"
  ],
  "JLG|X14J": [
    "180x72x37"
  ],
  "JLG|X14JH": [
    "180x72x37"
  ],
  "JLG|X17J": [
    "180x72x37"
  ],
  "JLG|X19J": [
    "180x72x37"
  ],
  "JLG|X23J": [
    "230x96x39",
    "250x48x78"
  ],
  "JLG|X33JPlus": [
    "300x55x82",
    "300x52.5x84"
  ],
  "JLG|X390AJ": [
    "180x72x37"
  ],
  "JLG|X550AJ": [
    "180x72x37"
  ],
  "JLG|X700AJ": [
    "230x96x39",
    "250x48x78"
  ],
  "Jekko|JF40": [
    "180x72x42"
  ],
  "Jekko|SPX424CDH": [
    "200x72x42"
  ],
  "Jekko|SPX527CDH": [
    "250x72x52"
  ],
  "John Deere|120 (US Market)": [
    "500x92x84"
  ],
  "John Deere|120C (US Market)": [
    "500x92x84"
  ],
  "John Deere|15": [
    "230x72x43"
  ],
  "John Deere|17 ZTS (US Market)": [
    "230x96x35",
    "230x48x70"
  ],
  "John Deere|17D": [
    "230x96x35",
    "230x48x70"
  ],
  "John Deere|17G": [
    "230x48x70"
  ],
  "John Deere|240": [
    "320x86x54",
    "375x86x54",
    "400x86x54"
  ],
  "John Deere|250": [
    "320x86x54",
    "375x86x54",
    "400x86x54"
  ],
  "John Deere|260": [
    "450x86x58"
  ],
  "John Deere|26D": [
    "300x52.5x80",
    "300x52.5x80"
  ],
  "John Deere|26G": [
    "300x52.5x80",
    "300x52.5x80"
  ],
  "John Deere|27 ZTS (US Market)": [
    "300x52.5x78",
    "300x52.5x78"
  ],
  "John Deere|270": [
    "450x86x58"
  ],
  "John Deere|27C ZTS (US Market)": [
    "300x52.5x78",
    "300x52.5x78"
  ],
  "John Deere|27D": [
    "300x52.5x80",
    "300x52.5x80"
  ],
  "John Deere|280": [
    "450x86x60"
  ],
  "John Deere|30G": [
    "300x52.5x86",
    "300x52.5x86"
  ],
  "John Deere|317": [
    "320x86x54",
    "375x86x54",
    "400x86x54"
  ],
  "John Deere|317G": [
    "320x86x50",
    "400x86x50"
  ],
  "John Deere|320": [
    "320x86x54",
    "375x86x54",
    "400x86x54"
  ],
  "John Deere|325": [
    "450x86x58"
  ],
  "John Deere|325G": [
    "320x86x52",
    "400x86x52"
  ],
  "John Deere|328": [
    "450x86x58"
  ],
  "John Deere|332": [
    "450x86x60"
  ],
  "John Deere|35 ZTS (US Market)": [
    "300x52.5x86",
    "300x52.5x86"
  ],
  "John Deere|35C ZTS (US Market)": [
    "300x52.5x86",
    "300x52.5x86"
  ],
  "John Deere|35D": [
    "300x52.5x86",
    "300x52.5x86"
  ],
  "John Deere|35G": [
    "300x52.5x86",
    "300x52.5x86"
  ],
  "John Deere|50 ZTS (US Market)": [
    "400x72.5x72"
  ],
  "John Deere|50C ZTS (US Market)": [
    "400x72.5x72"
  ],
  "John Deere|50D": [
    "400x72.5x74"
  ],
  "John Deere|50G (Verify Spocket Width)": [
    "400x72.5x74",
    "400x72.5x74"
  ],
  "John Deere|60D": [
    "400x72.5x74"
  ],
  "John Deere|60G [I Guiding]": [
    "400x72.5x74"
  ],
  "John Deere|60G [J Guiding]": [
    "400x72.5x74"
  ],
  "John Deere|75C": [
    "450x81x78",
    "450x81x78"
  ],
  "John Deere|75D": [
    "450x81x78",
    "450x81x78"
  ],
  "John Deere|75G": [
    "450x81x78",
    "450x81x78"
  ],
  "John Deere|85D": [
    "450x81x78",
    "450x81x78"
  ],
  "John Deere|85G": [
    "450x81x78",
    "450x81x78"
  ],
  "John Deere|8875": [
    "450x86x60"
  ],
  "John Deere|CT 319 D": [
    "320x86x52"
  ],
  "John Deere|CT 319 E": [
    "320x86x52"
  ],
  "John Deere|CT 322": [
    "320x86x52"
  ],
  "John Deere|CT 323D": [
    "320x86x52",
    "400x86x52"
  ],
  "John Deere|CT 323E": [
    "320x86x52",
    "400x86x52"
  ],
  "John Deere|CT329D": [
    "400x86x56",
    "450x86x56"
  ],
  "John Deere|CT329E": [
    "400x86x56",
    "450x86x56"
  ],
  "John Deere|CT331G": [
    "450x86x58"
  ],
  "John Deere|CT332": [
    "450x86x56"
  ],
  "John Deere|CT333D": [
    "400x86x56",
    "450x86x56"
  ],
  "John Deere|CT333E": [
    "400x86x56",
    "450x86x56"
  ],
  "John Deere|CT333G": [
    "450x86x58"
  ],
  "Joly|20HP (Minicarrier)": [
    "200x72x42"
  ],
  "Kaidi|103": [
    "230x72x43"
  ],
  "Kaidi|103.3": [
    "230x72x43"
  ],
  "Kaidi|WY 1.5": [
    "230x72x43"
  ],
  "Kato|70": [
    "450x71x84"
  ],
  "Kato|85V-4": [
    "450x71x82"
  ],
  "Kato|HD 09VX3": [
    "180x72x37"
  ],
  "Kato|HD 140": [
    "400x132x37",
    "400x72.5x72"
  ],
  "Kato|HD 205UR": [
    "400x72.5x74",
    "400x72.5x74"
  ],
  "Kato|HD 250UR": [
    "400x73x74",
    "400x72.5x74"
  ],
  "Kato|HD 307('2001)": [
    "450x71x84"
  ],
  "Kato|HD 308": [
    "450x81.5x76",
    "450x81x76"
  ],
  "Kato|HD 50UR": [
    "400x72.5x74"
  ],
  "Kato|HD 510": [
    "500x92x78"
  ],
  "Kato|HD 55UR": [
    "400x72.5x74"
  ],
  "Kato-Imer|19VXT": [
    "230x96x35",
    "230x48x70"
  ],
  "Kato-Imer|HD27V4": [
    "250x52.5x78",
    "300x52.5x78"
  ],
  "Kato-Imer|HD27V5": [
    "250x52.5x78",
    "300x52.5x78"
  ],
  "Kato-Imer|HD30V5": [
    "300x55x82",
    "300x52.5x84"
  ],
  "Kato-Imer|HD35": [
    "300x52.5x90"
  ],
  "Kato-Imer|HD45V5": [
    "400x72.5x74"
  ],
  "Kawasaki|KE 60": [
    "450x81.5x74",
    "450x81x76"
  ],
  "Kawasaki|Mini-carrier": [
    "200x72x35",
    "180x72x35"
  ],
  "Kobelco|115": [
    "230x96x31",
    "230x48x62"
  ],
  "Kobelco|B 53": [
    "450x81.5x74",
    "450x81.5x76"
  ],
  "Kobelco|B 61": [
    "400x74x72",
    "400x72.5x73"
  ],
  "Kobelco|B 69": [
    "400x74x72",
    "400x72.5x73"
  ],
  "Kobelco|FC 50": [
    "180x72x38"
  ],
  "Kobelco|SK 002": [
    "180x72x37"
  ],
  "Kobelco|SK 005": [
    "150x60x40",
    "180x72x36"
  ],
  "Kobelco|SK 007": [
    "180x72x37"
  ],
  "Kobelco|SK 007-1": [
    "180x72x37"
  ],
  "Kobelco|SK 007-2": [
    "180x72x37"
  ],
  "Kobelco|SK 007-3": [
    "180x72x37"
  ],
  "Kobelco|SK 008": [
    "180x72x37"
  ],
  "Kobelco|SK 009": [
    "180x72x37"
  ],
  "Kobelco|SK 013": [
    "230x96x31",
    "230x48x62"
  ],
  "Kobelco|SK 013-1": [
    "230x96x31",
    "230x48x62"
  ],
  "Kobelco|SK 014(New)": [
    "230x96x31",
    "230x48x62"
  ],
  "Kobelco|SK 014(Old)": [
    "230x72x43"
  ],
  "Kobelco|SK 020": [
    "250x109x35",
    "300x52.5x72"
  ],
  "Kobelco|SK 020 Coupe": [
    "250x109x35",
    "300x52.5x72"
  ],
  "Kobelco|SK 025 Coupe": [
    "300x109x38",
    "300x52.5x78"
  ],
  "Kobelco|SK 030 Coupe": [
    "300x109x40",
    "300x52.5x82"
  ],
  "Kobelco|SK 035 Coupe": [
    "350x108x42",
    "350x52.5x86"
  ],
  "Kobelco|SK 045 Coupe": [
    "400x74x72",
    "400x72.5x73"
  ],
  "Kobelco|SK 35SR": [
    "350x108x44",
    "350x52.5x90"
  ],
  "Kobelco|SK 35SR-2": [
    "350x108x44",
    "350x52.5x90"
  ],
  "Kobelco|SK 35SR-2E": [
    "300x52.5x88"
  ],
  "Kobelco|SK 35SR-3": [
    "300x52.5x88"
  ],
  "Kobelco|SK 35SR-5": [
    "300x52.5x88",
    "300x52.5x88"
  ],
  "Kobelco|SK 35SR-6": [
    "300x52.5x88"
  ],
  "Kobelco|SL 16MST": [
    "230x48x70"
  ],
  "Kobelco|SS 60": [
    "130x72x29"
  ],
  "Kobelco|SS1": [
    "130x72x29"
  ],
  "Kobelco|Sk 014-1": [
    "230x96x31",
    "230x48x62"
  ],
  "Kobelco|Sk 015": [
    "230x96x31",
    "230x48x62"
  ],
  "Kobelco|Sk 015-1": [
    "230x96x31",
    "230x48x62"
  ],
  "Kobelco|Sk 024": [
    "300x109x38",
    "300x52.5x78"
  ],
  "Kobelco|Sk 024-1": [
    "300x109x38",
    "300x52.5x78"
  ],
  "Kobelco|Sk 025": [
    "300x109x38",
    "300x52.5x78"
  ],
  "Kobelco|Sk 025-1": [
    "300x109x38",
    "300x52.5x78"
  ],
  "Kobelco|Sk 025-2": [
    "300x109x38",
    "300x52.5x78"
  ],
  "Kobelco|Sk 025SR": [
    "300x109x38",
    "300x52.5x78"
  ],
  "Kobelco|Sk 027": [
    "300x109x40",
    "300x52.5x82"
  ],
  "Kobelco|Sk 027-1": [
    "300x109x40",
    "300x52.5x82"
  ],
  "Kobelco|Sk 030": [
    "300x109x40",
    "300x52.5x82"
  ],
  "Kobelco|Sk 030-1": [
    "300x109x40",
    "300x52.5x82"
  ],
  "Kobelco|Sk 030-2": [
    "300x109x40",
    "300x52.5x82"
  ],
  "Kobelco|Sk 030SR": [
    "300x109x40",
    "300x52.5x82"
  ],
  "Kobelco|Sk 030UR": [
    "300x109x40",
    "300x52.5x82"
  ],
  "Kobelco|Sk 030UR-1": [
    "300x109x40",
    "300x52.5x82"
  ],
  "Kobelco|Sk 030UR-2": [
    "300x109x40",
    "300x52.5x82"
  ],
  "Kobelco|Sk 031": [
    "300x109x41",
    "300x52.5x84"
  ],
  "Kobelco|Sk 032": [
    "350x109x41",
    "350x52.5x84"
  ],
  "Kobelco|Sk 035": [
    "350x108x42",
    "350x52.5x86"
  ],
  "Kobelco|Sk 035-1": [
    "350x108x42",
    "350x52.5x86"
  ],
  "Kobelco|Sk 035-2": [
    "350x108x42",
    "350x52.5x86"
  ],
  "Kobelco|Sk 035SR": [
    "350x108x44",
    "350x52.5x90"
  ],
  "Kobelco|Sk 042": [
    "400x74x72",
    "400x72.5x73"
  ],
  "Kobelco|Sk 042-1": [
    "400x74x72",
    "400x72.5x73"
  ],
  "Kobelco|Sk 045": [
    "400x74x72",
    "400x72.5x73"
  ],
  "Kobelco|Sk 045-1": [
    "400x74x72",
    "400x72.5x73"
  ],
  "Kobelco|Sk 045-2": [
    "400x74x72",
    "400x72.5x73"
  ],
  "Kobelco|Sk 050": [
    "400x74x72",
    "400x72.5x73"
  ],
  "Kobelco|Sk 050-1": [
    "400x74x72",
    "400x72.5x73"
  ],
  "Kobelco|Sk 060": [
    "450x81.5x74",
    "450x81x76"
  ],
  "Kobelco|Sk 13SR": [
    "230x48x70"
  ],
  "Kobelco|Sk 15MSR": [
    "230x48x70"
  ],
  "Kobelco|Sk 15R": [
    "250x48x72",
    "230x48x72"
  ],
  "Kobelco|Sk 15SR": [
    "250x48x72",
    "230x48x72"
  ],
  "Kobelco|Sk 16MSR ('2001)": [
    "230x48x70"
  ],
  "Kobelco|Sk 17": [
    "230x48x70"
  ],
  "Kobelco|Sk 17 SR 3": [
    "230x48x70"
  ],
  "Kobelco|Sk 17 SR 5": [
    "230x72x46"
  ],
  "Kobelco|Sk 20SR": [
    "250x96x38",
    "250x48x76"
  ],
  "Kobelco|Sk 20SR-3": [
    "250x52.5x76",
    "300x52.5x76"
  ],
  "Kobelco|Sk 20UR ('2000)": [
    "250x109x35",
    "300x52.5x72"
  ],
  "Kobelco|Sk 25SR": [
    "300x109x38",
    "300x52.5x78"
  ],
  "Kobelco|Sk 25SR-2": [
    "250x52.5x76",
    "300x52.5x76"
  ],
  "Kobelco|Sk 25SR-6": [
    "250x55.5x79"
  ],
  "Kobelco|Sk 27": [
    "300x109x40",
    "300x52.5x82"
  ],
  "Kobelco|Sk 27SR-3": [
    "250x52.5x80",
    "300x52.5x80"
  ],
  "Kobelco|Sk 27SR-5": [
    "250x52.5x80",
    "300x52.5x80"
  ],
  "Kobelco|Sk 28SR-6": [
    "300x52.5x88"
  ],
  "Kobelco|Sk 30SR": [
    "300x109x40",
    "300x52.5x82"
  ],
  "Kobelco|Sk 30SR-1": [
    "300x109x40",
    "300x52.5x82"
  ],
  "Kobelco|Sk 30SR-2 ('2001)": [
    "300x52.5x82"
  ],
  "Kobelco|Sk 30SR-3": [
    "300x52.5x82",
    "300x52.5x82"
  ],
  "Kobelco|Sk 30SR-5": [
    "300x52.5x88",
    "300x52.5x88"
  ],
  "Kobelco|Sk 30SR-6": [
    "300x52.5x88",
    "300x52.5x88"
  ],
  "Kobelco|Sk 30UR": [
    "300x52.5x82"
  ],
  "Kobelco|Sk 30UR-1": [
    "300x109x40",
    "300x52.5x82"
  ],
  "Kobelco|Sk 30UR-2": [
    "300x109x40",
    "300x52.5x82"
  ],
  "Kobelco|Sk 40SR ('96-'06)": [
    "400x74x68",
    "400x72.5x70"
  ],
  "Kobelco|Sk 40SR-ZT": [
    "400x74x72",
    "400x72.5x73"
  ],
  "Kobelco|Sk 40SR3 ('96-'06)": [
    "400x74x68",
    "400x72.5x70"
  ],
  "Kobelco|Sk 45": [
    "400x74x72",
    "400x72.5x73"
  ],
  "Kobelco|Sk 45-1": [
    "400x74x72",
    "400x72.5x73"
  ],
  "Kobelco|Sk 45SR": [
    "400x74x72",
    "400x72.5x73"
  ],
  "Kobelco|Sk 45SR-2": [
    "400x74x72",
    "400x72.5x73"
  ],
  "Kobelco|Sk 50": [
    "400x74x72",
    "400x72.5x73"
  ],
  "Kobelco|Sk 50-1": [
    "400x74x72",
    "400x72.5x73"
  ],
  "Kobelco|Sk 50SR": [
    "400x74x72",
    "400x72.5x73"
  ],
  "Kobelco|Sk 50SR-3": [
    "400x74x72",
    "400x72.5x73"
  ],
  "Kobelco|Sk 50UR": [
    "400x74x72",
    "400x72.5x73"
  ],
  "Kobelco|Sk 50UR-1": [
    "400x74x72",
    "400x72.5x73"
  ],
  "Kobelco|Sk 50UR-2": [
    "400x74x72",
    "400x72.5x73"
  ],
  "Kobelco|Sk 55SRX": [
    "400x72.5x74"
  ],
  "Kobelco|Sk 55SRX 6E": [
    "400x72.5x74"
  ],
  "Kobelco|Sk 60": [
    "450x81.5x74",
    "450x81x76"
  ],
  "Kobelco|Sk 60-1": [
    "450x81.5x74",
    "450x81x76"
  ],
  "Kobelco|Sk 60-2": [
    "450x81.5x74",
    "450x81x76"
  ],
  "Kobelco|Sk 60-3 (untill'97)": [
    "450x81.5x74",
    "450x81x76"
  ],
  "Kobelco|Sk 60UR": [
    "450x81.5x74",
    "450x81x76"
  ],
  "Kobelco|Sk 70SR": [
    "450x81.5x74",
    "450x81x76"
  ],
  "Kobelco|Sk 70SR-1E": [
    "450x81.5x74",
    "450x81x76"
  ],
  "Kobelco|Sk 70SR-2": [
    "450x81.5x74",
    "450x81x76"
  ],
  "Kobelco|Sk 75-3": [
    "450x81.5x74",
    "450x81x76"
  ],
  "Kobelco|Sk 75SR": [
    "450x81.5x74",
    "450x81x76"
  ],
  "Kobelco|Sk 75UR": [
    "450x81.5x74",
    "450x81x76"
  ],
  "Kobelco|Sk 75UR-1": [
    "450x81.5x74",
    "450x81x76"
  ],
  "Kobelco|Sk 80CS": [
    "450x81.5x74",
    "450x81x76"
  ],
  "Kobelco|Sk 80MSR": [
    "450x81.5x74",
    "450x81x76"
  ],
  "Kobelco|Sk 85CS": [
    "450x81.5x74",
    "450x81x76"
  ],
  "Kobelco|Sk 85MSR": [
    "450x81.5x74",
    "450x81x76"
  ],
  "Kobelco|Sk 95UR": [
    "450x81x78",
    "450x81x78"
  ],
  "Kobelco|Sk25SR-3": [
    "250x52.5x80",
    "300x52.5x80"
  ],
  "Kobelco|Sk25SR-5": [
    "250x52.5x80",
    "300x52.5x80"
  ],
  "Kobelco|Z11 (Crawler Crane)": [
    "180x72x37"
  ],
  "Kobelco|Z13 (Crawler Crane)": [
    "300x109x38",
    "300x52.5x78"
  ],
  "Kobelco|Z14 (Crawler Crane)": [
    "300x109x40",
    "300x52.5x82"
  ],
  "Kobelco|Z15 (Crawler Crane)": [
    "350x109x41",
    "350x52.5x84"
  ],
  "Kobelco|Z16 (Crawler Crane)": [
    "400x74x72",
    "400x72.5x73"
  ],
  "Komatsu|1020 Turbo": [
    "320x86x56",
    "450x86x56"
  ],
  "Komatsu|820 Turbo": [
    "320x86x52"
  ],
  "Komatsu|CK 1122": [
    "450x86x56"
  ],
  "Komatsu|CK 1122-5": [
    "450x86x56"
  ],
  "Komatsu|CK 16": [
    "320x86x48"
  ],
  "Komatsu|CK 20": [
    "320x86x52"
  ],
  "Komatsu|CK 20-1": [
    "320x86x52"
  ],
  "Komatsu|CK 25": [
    "320x86x52"
  ],
  "Komatsu|CK 25-1": [
    "320x86x52"
  ],
  "Komatsu|CK 30": [
    "450x86x56"
  ],
  "Komatsu|CK 30-1": [
    "450x86x56"
  ],
  "Komatsu|CK 35": [
    "450x86x56"
  ],
  "Komatsu|CK 35-1": [
    "450x86x56"
  ],
  "Komatsu|D27R-8": [
    "300x52.5x80",
    "300x52.5x80"
  ],
  "Komatsu|PC 03": [
    "180x72x37"
  ],
  "Komatsu|PC 03 avance": [
    "180x72x37"
  ],
  "Komatsu|PC 03-1 (SN>1001)": [
    "180x72x37"
  ],
  "Komatsu|PC 03-2": [
    "180x72x37"
  ],
  "Komatsu|PC 03-2 avance (SN>15001)": [
    "180x72x37"
  ],
  "Komatsu|PC 05": [
    "230x72x42",
    "230x48x62",
    "230x96x31"
  ],
  "Komatsu|PC 05 avance R (8000<Sn&lt; 10619)": [
    "230x96x31",
    "230x48x62"
  ],
  "Komatsu|PC 05 avance R (SN>10616)": [
    "230x96x31",
    "230x48x62"
  ],
  "Komatsu|PC 05-1(SN>1001)": [
    "230x72x42"
  ],
  "Komatsu|PC 05-2": [
    "230x72x42"
  ],
  "Komatsu|PC 05-5(SN>2501)": [
    "230x72x42"
  ],
  "Komatsu|PC 05-6(SN<5001)": [
    "230x72x42"
  ],
  "Komatsu|PC 05-6(SN>5001)": [
    "230x96x31",
    "230x48x62"
  ],
  "Komatsu|PC 05-7": [
    "230x96x31",
    "230x48x62"
  ],
  "Komatsu|PC 05-8": [
    "230x96x31",
    "230x48x62"
  ],
  "Komatsu|PC 05-R(S/N 8001-10618)": [
    "230x96x31",
    "230x48x62"
  ],
  "Komatsu|PC 05-R(SN>10618)": [
    "230x96x31",
    "230x48x62"
  ],
  "Komatsu|PC 07": [
    "230x96x31",
    "230x48x62"
  ],
  "Komatsu|PC 07 avance R (S/N 3001-5460)": [
    "230x96x31",
    "230x48x62"
  ],
  "Komatsu|PC 07-1(S/N>1001)": [
    "230x96x31",
    "230x48x62"
  ],
  "Komatsu|PC 07-2": [
    "230x96x31",
    "230x48x62"
  ],
  "Komatsu|PC 07-2E(SN F11149)": [
    "230x96x31",
    "230x48x62"
  ],
  "Komatsu|PC 07-6": [
    "230x96x31",
    "230x48x62"
  ],
  "Komatsu|PC 07-7": [
    "230x96x31",
    "230x48x62"
  ],
  "Komatsu|PC 07FR-1": [
    "230x72x47"
  ],
  "Komatsu|PC 07R": [
    "230x96x31",
    "230x48x62"
  ],
  "Komatsu|PC 08": [
    "200x72x40"
  ],
  "Komatsu|PC 08 avance (SN>1000)": [
    "200x72x40"
  ],
  "Komatsu|PC 08U": [
    "200x72x40"
  ],
  "Komatsu|PC 08UU": [
    "200x72x40"
  ],
  "Komatsu|PC 08UU-1": [
    "200x72x40"
  ],
  "Komatsu|PC 09": [
    "180x72x37"
  ],
  "Komatsu|PC 09-1 (2006)": [
    "180x72x37"
  ],
  "Komatsu|PC 09FR": [
    "200x72x40"
  ],
  "Komatsu|PC 09FR-1": [
    "200x72x43"
  ],
  "Komatsu|PC 10-6 (SN>20001)": [
    "300x52.5x76",
    "250x52.5x76"
  ],
  "Komatsu|PC 10FR": [
    "260x97x40",
    "250x48.5x80"
  ],
  "Komatsu|PC 10MR": [
    "200x72x41"
  ],
  "Komatsu|PC 10MR-1 avance (SN>30001)": [
    "180x72x41"
  ],
  "Komatsu|PC 10UU": [
    "200x72x41"
  ],
  "Komatsu|PC 10UU-3 avance (SN>10001)": [
    "180x72x41"
  ],
  "Komatsu|PC 20 MR ('2006)": [
    "250x52.5x78",
    "300x52.5x78"
  ],
  "Komatsu|PC 20-2": [
    "300x109x41",
    "300x52.5x84",
    "300x55x81"
  ],
  "Komatsu|PC 20-6": [
    "300x109x39",
    "300x109x41"
  ],
  "Komatsu|PC 20-7 (S/N < F20419)": [
    "300x109x39"
  ],
  "Komatsu|PC 20-7 (S/N > F20419)": [
    "300x55x78"
  ],
  "Komatsu|PC 20FR-1": [
    "260x97x40",
    "250x48.5x80"
  ],
  "Komatsu|PC 20FR-2": [
    "260x97x40",
    "250x48.5x80"
  ],
  "Komatsu|PC 20MR-1 avance (SN > 10001)": [
    "250x52.5x78",
    "300x52.5x78"
  ],
  "Komatsu|PC 20MRX": [
    "250x52.5x78",
    "300x52.5x78"
  ],
  "Komatsu|PC 20MRX Utility": [
    "250x52.5x78",
    "300x52.5x78"
  ],
  "Komatsu|PC 20R": [
    "260x52.5x76",
    "250x52.5x76",
    "300x52.5x76"
  ],
  "Komatsu|PC 20R Utility": [
    "300x55x78",
    "300x52.5x80"
  ],
  "Komatsu|PC 20R-8 (SN > 10000) [OEM 260x52.5x76]": [
    "260x52.5x76",
    "250x52.5x76",
    "300x52.5x76"
  ],
  "Komatsu|PC 20R-8 [OEM 260x109x37]": [
    "260x109x37"
  ],
  "Komatsu|PC 20UU": [
    "250x52.5x78",
    "300x52.5x78"
  ],
  "Komatsu|PC 20UU-3 avance (SN > 10001)": [
    "250x52.5x78",
    "300x52.5x78"
  ],
  "Komatsu|PC 22MR-3": [
    "250x52.5x78",
    "300x52.5x78"
  ],
  "Komatsu|PC 24MR-5": [
    "250x52.5x76",
    "250x52.5x76"
  ],
  "Komatsu|PC 25": [
    "300x109x41",
    "300x52.5x84",
    "300x55x81"
  ],
  "Komatsu|PC 25 avance R (1001 < SN &lt; 6470)": [
    "300x109x41",
    "300x52.5x84",
    "300x55x81"
  ],
  "Komatsu|PC 25 avance R (SN > 6471)": [
    "300x52.5x84",
    "300x52.5x84"
  ],
  "Komatsu|PC 25-1 (SN > 6470)": [
    "300x109x41",
    "300x52.5x84",
    "300x55x81"
  ],
  "Komatsu|PC 25-2": [
    "300x109x41",
    "300x52.5x84",
    "300x55x81"
  ],
  "Komatsu|PC 25-7": [
    "300x55x82",
    "300x52.5x84"
  ],
  "Komatsu|PC 25E-1 (SN > 6470)": [
    "300x55x82",
    "300x52.5x84"
  ],
  "Komatsu|PC 25R": [
    "300x52.5x80",
    "300x52.5x80",
    "300x55x77"
  ],
  "Komatsu|PC 25R-8": [
    "300x52.5x80",
    "300x52.5x80",
    "300x55x77"
  ],
  "Komatsu|PC 26MR": [
    "300x52.5x80",
    "300x52.5x80"
  ],
  "Komatsu|PC 26MR-5": [
    "300x52.5x80",
    "300x52.5x80"
  ],
  "Komatsu|PC 27": [
    "300x109x39",
    "300x52.5x80",
    "300x55x77"
  ],
  "Komatsu|PC 27MR": [
    "300x52.5x80",
    "300x52.5x80"
  ],
  "Komatsu|PC 27MR-1 avance (SN > 10001)": [
    "300x52.5x80",
    "300x52.5x80"
  ],
  "Komatsu|PC 27MR-2": [
    "300x52.5x80",
    "300x52.5x80"
  ],
  "Komatsu|PC 27MR-3": [
    "300x52.5x80",
    "300x52.5x80"
  ],
  "Komatsu|PC 27MRX": [
    "300x52.5x80",
    "300x52.5x80"
  ],
  "Komatsu|PC 27R": [
    "300x55x78",
    "300x55x78"
  ],
  "Komatsu|PC 27R Utility": [
    "300x55x78",
    "300x55x78"
  ],
  "Komatsu|PC 27R-8": [
    "300x109x39",
    "300x52.5x80",
    "300x55x77"
  ],
  "Komatsu|PC 27R-8E Deluxe": [
    "300x55x78",
    "300x55x77"
  ],
  "Komatsu|PC 28": [
    "260x109x39",
    "300x52.5x80",
    "260x100x42",
    "300x52.5x80",
    "300x55x77"
  ],
  "Komatsu|PC 28 UU-3 avance (SN > 30001)": [
    "300x52.5x80",
    "300x52.5x80",
    "300x55x77"
  ],
  "Komatsu|PC 28-1 (S/N > 2358)": [
    "260x109x39",
    "300x52.5x80",
    "300x55x77"
  ],
  "Komatsu|PC 28-2": [
    "260x109x39",
    "300x52.5x80",
    "300x55x77"
  ],
  "Komatsu|PC 28-2 avance (7001 < SN &lt; 10800)": [
    "300x109x39",
    "300x52.5x80",
    "300x55x77"
  ],
  "Komatsu|PC 28-2 avance (SN > 10801)": [
    "300x52.5x80",
    "300x52.5x80",
    "300x55x77"
  ],
  "Komatsu|PC 28R": [
    "260x109x39",
    "300x52.5x80",
    "300x55x77"
  ],
  "Komatsu|PC 28uu": [
    "260x109x39",
    "300x52.5x80",
    "300x55x77"
  ],
  "Komatsu|PC 28uu-1": [
    "260x109x39",
    "300x52.5x80",
    "300x55x77"
  ],
  "Komatsu|PC 28uu-2": [
    "260x109x39",
    "300x52.5x80",
    "300x55x77"
  ],
  "Komatsu|PC 28uu-3": [
    "300x52.5x80",
    "300x52.5x80",
    "300x55x77"
  ],
  "Komatsu|PC 30": [
    "300x109x41",
    "320x100x45",
    "300x52.5x84",
    "300x55x81"
  ],
  "Komatsu|PC 30 avance R": [
    "300x109x41",
    "300x52.5x84",
    "300x55x81"
  ],
  "Komatsu|PC 30 avance R (SN > 26423)": [
    "300x52.5x84",
    "300x52.5x84"
  ],
  "Komatsu|PC 30-5": [
    "300x109x41",
    "320x100x45",
    "300x52.5x84",
    "300x55x81"
  ],
  "Komatsu|PC 30-6": [
    "300x109x41",
    "300x52.5x84",
    "300x55x81"
  ],
  "Komatsu|PC 30-7 (S/N < F18384)": [
    "300x109x41",
    "300x52.5x84",
    "300x55x81"
  ],
  "Komatsu|PC 30-7 (S/N > F18384)": [
    "300x109x41",
    "300x52.5x84",
    "300x55x81"
  ],
  "Komatsu|PC 30-7E": [
    "300x109x41",
    "300x52.5x84",
    "300x55x81"
  ],
  "Komatsu|PC 30-8": [
    "300x109x41",
    "300x55x81"
  ],
  "Komatsu|PC 30FR-1": [
    "300x55x78",
    "300x55x78"
  ],
  "Komatsu|PC 30FR-2": [
    "300x55.5x82"
  ],
  "Komatsu|PC 30MR": [
    "300x52.5x84",
    "300x52.5x84",
    "300x55x81"
  ],
  "Komatsu|PC 30MR-1": [
    "300x52.5x84",
    "300x52.5x84",
    "300x55x81"
  ],
  "Komatsu|PC 30MR-1 (> 05/04 mfg)": [
    "300x52.5x86",
    "300x52.5x86"
  ],
  "Komatsu|PC 30MR-2": [
    "300x52.5x86",
    "300x52.5x86"
  ],
  "Komatsu|PC 30MR-3": [
    "300x52.5x86",
    "300x52.5x86"
  ],
  "Komatsu|PC 30MRX": [
    "300x52.5x84",
    "300x52.5x84"
  ],
  "Komatsu|PC 30R": [
    "300x52.5x84",
    "300x52.5x84",
    "300x55x81"
  ],
  "Komatsu|PC 30R-8": [
    "300x109x41",
    "300x52.5x84",
    "300x55x81"
  ],
  "Komatsu|PC 30R-8 avance (SN > 10001)": [
    "300x52.5x84",
    "300x52.5x84",
    "300x55x81"
  ],
  "Komatsu|PC 30uu-2": [
    "300x109x41",
    "300x52.5x84",
    "300x55x81"
  ],
  "Komatsu|PC 30uu-3": [
    "300x109x41",
    "300x52.5x84",
    "300x55x81"
  ],
  "Komatsu|PC 35": [
    "300x109x41",
    "300x52.5x84",
    "300x55x81"
  ],
  "Komatsu|PC 35-8": [
    "300x52.5x84",
    "300x52.5x84"
  ],
  "Komatsu|PC 35MR": [
    "300x109x41",
    "300x52.5x84",
    "300x55x81"
  ],
  "Komatsu|PC 35MR-1": [
    "300x52.5x84",
    "300x52.5x84",
    "300x55x81"
  ],
  "Komatsu|PC 35MR-1 (> 05/04 mfg)": [
    "300x52.5x86",
    "300x52.5x86"
  ],
  "Komatsu|PC 35MR-2": [
    "300x52.5x86",
    "300x52.5x86"
  ],
  "Komatsu|PC 35MR-3": [
    "300x52.5x86",
    "300x52.5x86"
  ],
  "Komatsu|PC 35MR-5": [
    "300x52.5x86",
    "300x52.5x86"
  ],
  "Komatsu|PC 35MRX": [
    "300x52.5x84",
    "300x52.5x84",
    "300x55x81"
  ],
  "Komatsu|PC 35R": [
    "300x109x41",
    "300x52.5x84",
    "300x55x81"
  ],
  "Komatsu|PC 35R Utility": [
    "300x55x82",
    "300x52.5x84"
  ],
  "Komatsu|PC 35R-8 Deluxe": [
    "300x52.5x84",
    "300x52.5x84"
  ],
  "Komatsu|PC 35R-8 [OEM 300x109x41]": [
    "300x109x41",
    "300x52.5x84",
    "300x55x81"
  ],
  "Komatsu|PC 35R-8 [OEM 300x55x82]": [
    "300x55x82",
    "300x55x81"
  ],
  "Komatsu|PC 35R-8 avance (SN > 35001)": [
    "300x52.5x84"
  ],
  "Komatsu|PC 38": [
    "300x109x41",
    "300x52.5x84",
    "300x55x81"
  ],
  "Komatsu|PC 38-2": [
    "300x109x41",
    "300x52.5x84",
    "300x55x81"
  ],
  "Komatsu|PC 38-2 avance R": [
    "300x109x41",
    "300x52.5x84",
    "300x55x81"
  ],
  "Komatsu|PC 38uu-2": [
    "300x55x82",
    "300x52.5x86"
  ],
  "Komatsu|PC 38uu-2 avance (3001 < SN &lt; 4482)": [
    "300x109x41",
    "300x52.5x84",
    "300x55x81"
  ],
  "Komatsu|PC 38uu-2 avance (SN > 4483)": [
    "300x52.5x84",
    "300x52.5x84",
    "300x55x81"
  ],
  "Komatsu|PC 38uu-3": [
    "300x55x82",
    "300x52.5x86"
  ],
  "Komatsu|PC 38uuM-2": [
    "300x55x82",
    "300x52.5x86"
  ],
  "Komatsu|PC 38uuM-2 avance (SN > 1001)": [
    "300x52.5x84",
    "300x52.5x84",
    "300x55x81"
  ],
  "Komatsu|PC 40 avance R (> 24521)": [
    "40x73x72",
    "400x72.5x72"
  ],
  "Komatsu|PC 40-7 (SN > 24521)": [
    "400x73x72",
    "400x72.5x72"
  ],
  "Komatsu|PC 40FR-2 ('Victas assymetric')": [
    "350x75.5x74",
    "400x75.5x74"
  ],
  "Komatsu|PC 40MR": [
    "400x72.5x72",
    "400x72.5x72"
  ],
  "Komatsu|PC 40MR-1 (SN > 1001)": [
    "400x73x72",
    "400x72.5x72"
  ],
  "Komatsu|PC 40MR-2": [
    "400x72.5x74",
    "400x72.5x74"
  ],
  "Komatsu|PC 40MRX": [
    "400x73x72",
    "400x72.5x72"
  ],
  "Komatsu|PC 40R (S/N > 24522)": [
    "400x72.5x72",
    "400x72.5x72"
  ],
  "Komatsu|PC 40R-8": [
    "400x72.5x72",
    "400x72.5x72"
  ],
  "Komatsu|PC 40R-8 avance (SN > 30001)": [
    "400x73x72",
    "400x72.5x72"
  ],
  "Komatsu|PC 40T": [
    "400x73x72",
    "400x72.5x72"
  ],
  "Komatsu|PC 45": [
    "400x72.5x72",
    "400x72.5x72"
  ],
  "Komatsu|PC 45 avance R (S/N > 3505)": [
    "400x73x72",
    "400x72.5x72"
  ],
  "Komatsu|PC 45-1 (F1492)": [
    "400x72.5x72"
  ],
  "Komatsu|PC 45-1E": [
    "400x72.5x72",
    "400x72.5x72"
  ],
  "Komatsu|PC 45-8": [
    "400x72.5x72",
    "400x72.5x72"
  ],
  "Komatsu|PC 45MR": [
    "400x72.5x72",
    "400x72.5x72"
  ],
  "Komatsu|PC 45MR-1": [
    "400x73x72",
    "400x72.5x72"
  ],
  "Komatsu|PC 45MR-3": [
    "450x86x58"
  ],
  "Komatsu|PC 45MR-5": [
    "320x86x54",
    "375x86x54",
    "400x86x54"
  ],
  "Komatsu|PC 45MRX": [
    "320x86x54",
    "375x86x54",
    "400x86x54"
  ],
  "Komatsu|PC 45R (> 3506)": [
    "320x86x54",
    "375x86x54",
    "400x86x54"
  ],
  "Komatsu|PC 45R Utility": [
    "400x72.5x72",
    "400x72.5x72"
  ],
  "Komatsu|PC 45R-8": [
    "400x72.5x72",
    "400x72.5x72"
  ],
  "Komatsu|PC 45R-8 avance (SN > 5001)": [
    "400x73x72",
    "400x72.5x72"
  ],
  "Komatsu|PC 50-2 (> 12772)": [
    "400x73x72",
    "400x72.5x72"
  ],
  "Komatsu|PC 50-2 avance R (S/N > 12771)": [
    "400x72.5x72",
    "400x72.5x72"
  ],
  "Komatsu|PC 50-3": [
    "400x72.5x72",
    "400x72.5x72"
  ],
  "Komatsu|PC 50FR-1": [
    "400x72.5x72",
    "400x72.5x72"
  ],
  "Komatsu|PC 50FR-2 (Victas assymetric)": [
    "400x75.5x74"
  ],
  "Komatsu|PC 50M-2": [
    "400x72.5x72",
    "400x72.5x72"
  ],
  "Komatsu|PC 50MR": [
    "400x72.5x74",
    "400x72.5x74"
  ],
  "Komatsu|PC 50MR-1 (>05/04 mfg)": [
    "400x72.5x74",
    "400x72.5x74"
  ],
  "Komatsu|PC 50MR-2 ('2006)": [
    "400x72.5x74",
    "400x72.5x74"
  ],
  "Komatsu|PC 50UD UG-2 (SN > 12750)": [
    "400x73x72",
    "400x72.5x72"
  ],
  "Komatsu|PC 50uu-2 (New)": [
    "400x73x72",
    "400x72.5x72"
  ],
  "Komatsu|PC 50uu-2 avance (SN > 12772)": [
    "400x73x72",
    "400x72.5x72"
  ],
  "Komatsu|PC 50uu-2E (SN > 12760)": [
    "400x73x72",
    "400x72.5x72"
  ],
  "Komatsu|PC 50uuM-2": [
    "400x72.5x72",
    "400x72.5x72"
  ],
  "Komatsu|PC 50uuM-2 avance (SN > 10001)": [
    "400x73x72",
    "400x72.5x72"
  ],
  "Komatsu|PC 55MR": [
    "400x72.5x74",
    "400x72.5x74"
  ],
  "Komatsu|PC 55MR-3": [
    "400x72.5x74",
    "400x72.5x74"
  ],
  "Komatsu|PC 58SF-1 (SN > 1001)": [
    "400x73x72",
    "400x72.5x72"
  ],
  "Komatsu|PC 58uu-3": [
    "400x135x38",
    "400x72.5x72"
  ],
  "Komatsu|PC 58uu-X": [
    "400x135x38",
    "400x72.5x72"
  ],
  "Komatsu|PC 60-6 (type 2)": [
    "450x83.5x74",
    "450x81x76"
  ],
  "Komatsu|PC 60-6 (type 3)": [
    "450x83.5x74",
    "450x81x76"
  ],
  "Komatsu|PC 75": [
    "450x76x80"
  ],
  "Komatsu|PC 75-1 (S/N 1175 - 5001)": [
    "450x76x80"
  ],
  "Komatsu|PC 75-2 (S/N 5001 - 7927)": [
    "450x76x80"
  ],
  "Komatsu|PC 75-2 (S/N > 7928)": [
    "450x83.5x74",
    "450x81x76"
  ],
  "Komatsu|PC 75R-2": [
    "450x76x80"
  ],
  "Komatsu|PC 75R-8": [
    "450x76x80"
  ],
  "Komatsu|PC 75uu-1 (SN > 1175)": [
    "450x83.5x74",
    "450x81x76"
  ],
  "Komatsu|PC 75uu-2 (SN > 7927)": [
    "450x83.5x74",
    "450x81x76"
  ],
  "Komatsu|PC 75uu-2A": [
    "450x83.5x74",
    "450x81x76"
  ],
  "Komatsu|PC 75uu-2AR": [
    "450x83.5x74",
    "450x81x76"
  ],
  "Komatsu|PC 75uu-2DQ": [
    "450x83.5x74",
    "450x81x76"
  ],
  "Komatsu|PC 75uu-2R": [
    "450x83.5x74",
    "450x81x76"
  ],
  "Komatsu|PC 75uu-3": [
    "450x83.5x74",
    "450x81x76"
  ],
  "Komatsu|PC 75uu-3A": [
    "450x83.5x74",
    "450x81x76"
  ],
  "Komatsu|PC 75uu-3T": [
    "450x83.5x74",
    "450x81x76"
  ],
  "Komatsu|PC 75uuT-6": [
    "450x83.5x74",
    "450x81x76"
  ],
  "Komatsu|PC 78MR-6 (verify links! May be 74 link count)": [
    "450x83.5x74",
    "450x81x76"
  ],
  "Komatsu|PC 78N": [
    "450x83.5x74",
    "450x81x76"
  ],
  "Komatsu|PC 80MR": [
    "450x83.5x74",
    "450x81x76"
  ],
  "Komatsu|PC 80MR-5": [
    "450x83.5x74",
    "450x81x76"
  ],
  "Komatsu|PC 88MR": [
    "450x83.5x74",
    "450x81x76"
  ],
  "Komatsu|PC 88MR-10": [
    "450x83.5x74",
    "450x81x76"
  ],
  "Komatsu|PC 88MR-6": [
    "450x83.5x74",
    "450x81x76"
  ],
  "Komatsu|PC 88MR-8": [
    "450x83.5x74",
    "450x81x76"
  ],
  "Komatsu|PC 95": [
    "450x76x84"
  ],
  "Komatsu|PC 95-1": [
    "450x76x84"
  ],
  "Komatsu|PC 95R-2": [
    "450x76x84"
  ],
  "Komatsu|PC12R-8": [
    "230x96x31",
    "230x48x62"
  ],
  "Komatsu|PC12R-8 Mistral HS": [
    "230x96x31",
    "230x48x62"
  ],
  "Komatsu|PC12R-8 avance": [
    "230x96x31",
    "230x48x62"
  ],
  "Komatsu|PC14R HS": [
    "230x96x35",
    "230x48x70"
  ],
  "Komatsu|PC14R-2": [
    "230x96x31",
    "230x48x62"
  ],
  "Komatsu|PC14R-2 HS": [
    "230x96x35",
    "230x48x70"
  ],
  "Komatsu|PC14R-3": [
    "230x48x62"
  ],
  "Komatsu|PC14R-3 HS": [
    "230x48x70"
  ],
  "Komatsu|PC15": [
    "300x52.5x80",
    "260x100x42",
    "300x55x77"
  ],
  "Komatsu|PC15 FR-1": [
    "230x72x47"
  ],
  "Komatsu|PC15 MR": [
    "200x72x41",
    "230x96x35",
    "230x48x70"
  ],
  "Komatsu|PC15 MR-1": [
    "180x72x41"
  ],
  "Komatsu|PC15 MRX": [
    "230x96x35",
    "230x48x70"
  ],
  "Komatsu|PC15 MRX-1": [
    "230x96x35",
    "230x48x70"
  ],
  "Komatsu|PC15 P": [
    "260x109x39",
    "300x52.5x80",
    "300x55x77"
  ],
  "Komatsu|PC15 R": [
    "230x96x31",
    "230x48x62"
  ],
  "Komatsu|PC15 R HS": [
    "230x96x31",
    "230x48x62"
  ],
  "Komatsu|PC15 R Mistral": [
    "230x96x31",
    "230x48x62"
  ],
  "Komatsu|PC15 R-8E Deluxe": [
    "230x96x31",
    "230x48x62"
  ],
  "Komatsu|PC15 avance R(5001<SN&lt;6221)": [
    "300x109x39",
    "300x52.5x80",
    "300x55x77"
  ],
  "Komatsu|PC15 avance R(SN>6222)": [
    "300x52.5x80",
    "300x52.5x80"
  ],
  "Komatsu|PC15-1 (SN>1001)": [
    "260x109x39",
    "300x52.5x80",
    "300x55x77"
  ],
  "Komatsu|PC15-2 (Not on new rollers)": [
    "260x109x39",
    "300x52.5x80",
    "300x55x77"
  ],
  "Komatsu|PC15-2 (SN>2001)": [
    "260x109x39",
    "300x52.5x80",
    "300x55x77"
  ],
  "Komatsu|PC15-3": [
    "260x109x39",
    "300x52.5x80",
    "300x55x77"
  ],
  "Komatsu|PC15-6": [
    "260x109x39",
    "300x52.5x80",
    "300x55x77"
  ],
  "Komatsu|PC15-6 (Not on new rollers)": [
    "260x109x39",
    "300x52.5x80",
    "300x55x77"
  ],
  "Komatsu|PC15-7": [
    "300x52.5x80",
    "300x52.5x80"
  ],
  "Komatsu|PC16 R HS": [
    "230x96x35",
    "230x48x70"
  ],
  "Komatsu|PC16 R-2": [
    "230x96x31",
    "230x48x62"
  ],
  "Komatsu|PC16 R-2HS": [
    "230x96x35",
    "230x48x70"
  ],
  "Komatsu|PC16 R-3": [
    "230x48x62"
  ],
  "Komatsu|PC16R-3HS": [
    "230x48x70"
  ],
  "Komatsu|PC18MR('2006)": [
    "230x96x35",
    "230x48x70"
  ],
  "Komatsu|PC18MR-2('2006)": [
    "230x96x35",
    "230x48x70"
  ],
  "Komatsu|PC18MR-3": [
    "230x96x35",
    "230x48x70"
  ],
  "Komatsu|PC18MR-5": [
    "230x48x70"
  ],
  "Komatsu|PC20": [
    "320x100x45"
  ],
  "Komatsu|PC20 MR-2": [
    "260x52.5x78",
    "300x52.5x78"
  ],
  "Komatsu|PC20 avance R (35001<SN&lt;42354)": [
    "300x109x39"
  ],
  "Komatsu|PC20 avance R (SN>42355)": [
    "300x52.5x80"
  ],
  "Komatsu|PC20(F10038)": [
    "300x109x41"
  ],
  "Komatsu|PC20-8": [
    "300x55x78",
    "300x52.5x80"
  ],
  "Komatsu|PC75R": [
    "450x76x80"
  ],
  "Komatsu|SK1020 (VTS System for Skidsteer Loader)": [
    "450x86x58"
  ],
  "Komatsu|SK815 (VTS System for Skidsteer Loader)": [
    "320x86x54",
    "375x86x54",
    "400x86x54"
  ],
  "Komatsu|SK818 (VTS System for Skidsteer Loader)": [
    "320x86x54",
    "375x86x54",
    "400x86x54"
  ],
  "Komatsu|SK820 (VTS System for Skidsteer Loader)": [
    "320x86x54",
    "375x86x54",
    "400x86x54"
  ],
  "Kubota|AR 30": [
    "300x109x39",
    "300x52.5x80"
  ],
  "Kubota|D902": [
    "230x96x32",
    "230x48x64"
  ],
  "Kubota|FH 007": [
    "180x72x36"
  ],
  "Kubota|HG": [
    "200x72x42"
  ],
  "Kubota|K 007": [
    "180x72x36"
  ],
  "Kubota|K 008": [
    "180x72x37"
  ],
  "Kubota|K 008-2": [
    "180x72x37"
  ],
  "Kubota|K 008-3": [
    "180x72x37"
  ],
  "Kubota|K 008-3G": [
    "180x72x37"
  ],
  "Kubota|K 008DH": [
    "180x72x37"
  ],
  "Kubota|K 013": [
    "200x96x30",
    "230x48x60"
  ],
  "Kubota|K 015": [
    "200x96x30",
    "230x48x60"
  ],
  "Kubota|K 020": [
    "250x109x37",
    "250x52.5x76",
    "300x52.5x76"
  ],
  "Kubota|K 022": [
    "250x109x37",
    "250x52.5x76",
    "300x52.5x76"
  ],
  "Kubota|K 025": [
    "300x109x37",
    "250x52.5x76",
    "300x52.5x76"
  ],
  "Kubota|K 028": [
    "300x109x39",
    "300x52.5x80"
  ],
  "Kubota|K 030": [
    "300x109x39",
    "300x52.5x80"
  ],
  "Kubota|K 030 (Lotus root)": [
    "300x109x39",
    "300x52.5x80"
  ],
  "Kubota|K 030-3": [
    "300x53x80"
  ],
  "Kubota|K 035": [
    "300x52.5x84"
  ],
  "Kubota|K 035-3": [
    "300x53x84"
  ],
  "Kubota|K 038": [
    "350x56x84",
    "350x52.5x88"
  ],
  "Kubota|K 040": [
    "400x72.5x72"
  ],
  "Kubota|K 045": [
    "400x72.5x72"
  ],
  "Kubota|K 080": [
    "450x81.5x76",
    "450x81x76"
  ],
  "Kubota|K 151": [
    "400x72.5x72"
  ],
  "Kubota|KC 110H (dumper)": [
    "250x72x48"
  ],
  "Kubota|KC 110HR (dumper)": [
    "250x72x48"
  ],
  "Kubota|KC 110HR-4 (dumper)": [
    "230x72x43"
  ],
  "Kubota|KC 120 (dumper)": [
    "250x72x45",
    "230x72x46"
  ],
  "Kubota|KC 121 (dumper)": [
    "280x72x52",
    "250x72x52"
  ],
  "Kubota|KC 140": [
    "250x72x45"
  ],
  "Kubota|KC 40 (dumper)": [
    "180x60x34"
  ],
  "Kubota|KC 50 (dumper) [OEM 200x72x34]": [
    "200x72x34",
    "200x72x39"
  ],
  "Kubota|KC 50 new (dumper) [OEM 250x72x46]": [
    "250x72x46"
  ],
  "Kubota|KC 50LZ (dumper)": [
    "200x72x39"
  ],
  "Kubota|KC 51": [
    "200x72x39"
  ],
  "Kubota|KC 70 (dumper)": [
    "200x72x39"
  ],
  "Kubota|KH 007": [
    "180x72x36",
    "180x72x37"
  ],
  "Kubota|KH 008": [
    "180x72x37"
  ],
  "Kubota|KH 012 (new)": [
    "230x96x30",
    "230x48x60"
  ],
  "Kubota|KH 012 (old)": [
    "200x72x42"
  ],
  "Kubota|KH 012G": [
    "200x72x42"
  ],
  "Kubota|KH 012HG": [
    "200x72x42"
  ],
  "Kubota|KH 014": [
    "230x72x42"
  ],
  "Kubota|KH 014G": [
    "230x72x42"
  ],
  "Kubota|KH 014HG": [
    "230x72x42"
  ],
  "Kubota|KH 02": [
    "300x109x37",
    "250x52.5x76",
    "300x52.5x76"
  ],
  "Kubota|KH 021": [
    "250x109x35",
    "300x52.5x72"
  ],
  "Kubota|KH 021HG": [
    "250x109x35",
    "300x52.5x72"
  ],
  "Kubota|KH 024": [
    "300x109x37"
  ],
  "Kubota|KH 026": [
    "300x109x37"
  ],
  "Kubota|KH 026G": [
    "300x109x35"
  ],
  "Kubota|KH 027": [
    "300x109x37",
    "250x52.5x76",
    "300x52.5x76"
  ],
  "Kubota|KH 027G": [
    "300x109x37",
    "250x52.5x76",
    "300x52.5x76"
  ],
  "Kubota|KH 02HG": [
    "300x109x37",
    "250x52.5x76",
    "300x52.5x76"
  ],
  "Kubota|KH 030": [
    "300x109x39",
    "300x52.5x80"
  ],
  "Kubota|KH 030G": [
    "300x109x39",
    "300x52.5x80"
  ],
  "Kubota|KH 030HG": [
    "300x109x39",
    "300x52.5x80"
  ],
  "Kubota|KH 033 [OEM 300x109x39]": [
    "300x109x39",
    "300x109x41"
  ],
  "Kubota|KH 033HG [OEM 300x109x39]": [
    "300x109x39",
    "300x109x41"
  ],
  "Kubota|KH 040": [
    "400x142x37",
    "400x72.5x72"
  ],
  "Kubota|KH 041": [
    "230x72x42"
  ],
  "Kubota|KH 045": [
    "400x142x37",
    "400x72.5x72"
  ],
  "Kubota|KH 05": [
    "200x72x42"
  ],
  "Kubota|KH 055": [
    "400x142x39",
    "400x72.5x76"
  ],
  "Kubota|KH 055N": [
    "400x72.5x76"
  ],
  "Kubota|KH 060": [
    "300x109x37",
    "250x52.5x76",
    "300x52.5x76"
  ],
  "Kubota|KH 07": [
    "180x72x37"
  ],
  "Kubota|KH 090": [
    "300x109x41",
    "300x52.5x84"
  ],
  "Kubota|KH 101": [
    "300x109x41",
    "300x52.5x84"
  ],
  "Kubota|KH 12": [
    "200x72x42"
  ],
  "Kubota|KH 120": [
    "230x72x42"
  ],
  "Kubota|KH 121": [
    "300x109x35",
    "300x52.5x72"
  ],
  "Kubota|KH 130": [
    "400x146x36",
    "400x72.5x72"
  ],
  "Kubota|KH 14": [
    "230x72x42"
  ],
  "Kubota|KH 14G": [
    "230x72x42"
  ],
  "Kubota|KH 14HG": [
    "230x72x42"
  ],
  "Kubota|KH 151": [
    "400x142x37",
    "400x72.5x72"
  ],
  "Kubota|KH 191 [OEM 450x71x78]": [
    "450x71x78",
    "450x81x72"
  ],
  "Kubota|KH 21": [
    "180x72x36"
  ],
  "Kubota|KH 24": [
    "300x109x37",
    "250x52.5x76",
    "300x52.5x76"
  ],
  "Kubota|KH 24HG": [
    "300x109x37",
    "250x52.5x76",
    "300x52.5x76"
  ],
  "Kubota|KH 26HG": [
    "300x109x37",
    "250x52.5x76",
    "300x52.5x76"
  ],
  "Kubota|KH 26SR [OEM 320x100x40]": [
    "320x100x40",
    "320x100x43"
  ],
  "Kubota|KH 28": [
    "200x72x42"
  ],
  "Kubota|KH 30SR [OEM 320x100x40]": [
    "320x100x40",
    "320x100x43"
  ],
  "Kubota|KH 30SRG [OEM 320x100x40]": [
    "320x100x40",
    "320x100x43"
  ],
  "Kubota|KH 31": [
    "200x72x42"
  ],
  "Kubota|KH 35": [
    "200x72x42"
  ],
  "Kubota|KH 36": [
    "200x72x42"
  ],
  "Kubota|KH 37": [
    "200x72x42"
  ],
  "Kubota|KH 38": [
    "200x72x42"
  ],
  "Kubota|KH 41 [OEM 230x72x42]": [
    "230x72x42",
    "230x96x30"
  ],
  "Kubota|KH 41R": [
    "230x72x42"
  ],
  "Kubota|KH 5": [
    "200x72x42"
  ],
  "Kubota|KH 50 [OEM 230x72x42]": [
    "230x72x42",
    "250x109x35"
  ],
  "Kubota|KH 50SR [OEM 420x100x52]": [
    "420x100x52",
    "420x100x54"
  ],
  "Kubota|KH 51": [
    "250x109x35",
    "300x52.5x72"
  ],
  "Kubota|KH 51SR [OEM 420x100x52]": [
    "420x100x52",
    "420x100x54"
  ],
  "Kubota|KH 52": [
    "250x109x35",
    "300x52.5x72"
  ],
  "Kubota|KH 52SR [OEM 400x146x36]": [
    "400x146x36",
    "420x100x52",
    "420x100x54"
  ],
  "Kubota|KH 55 [OEM 230x72x42]": [
    "230x72x42",
    "250x109x35"
  ],
  "Kubota|KH 55G": [
    "230x72x42"
  ],
  "Kubota|KH 55R": [
    "230x72x42"
  ],
  "Kubota|KH 55S": [
    "230x72x42"
  ],
  "Kubota|KH 55X": [
    "230x72x42"
  ],
  "Kubota|KH 5HC": [
    "200x72x42"
  ],
  "Kubota|KH 60 [OEM 300x109x35]": [
    "300x109x35",
    "300x109x37"
  ],
  "Kubota|KH 61": [
    "300x109x35",
    "300x52.5x72"
  ],
  "Kubota|KH 65": [
    "300x109x37",
    "250x52.5x76",
    "300x52.5x76"
  ],
  "Kubota|KH 66 [OEM 300x109x35]": [
    "300x109x35",
    "300x109x37"
  ],
  "Kubota|KH 70 [OEM 300x109x37]": [
    "300x109x37",
    "300x109x39"
  ],
  "Kubota|KH 71 [OEM 300x109x35]": [
    "300x109x35"
  ],
  "Kubota|KH 90": [
    "300x109x41",
    "300x52.5x84"
  ],
  "Kubota|KH 91": [
    "300x100x39",
    "300x52.5x80"
  ],
  "Kubota|KN 36": [
    "200x96x30",
    "230x48x60"
  ],
  "Kubota|KN 51": [
    "250x109x35",
    "300x52.5x72"
  ],
  "Kubota|KX 007": [
    "180x72x36"
  ],
  "Kubota|KX 008": [
    "180x72x37"
  ],
  "Kubota|KX 012": [
    "230x96x30",
    "230x48x60"
  ],
  "Kubota|KX 014": [
    "230x96x30",
    "230x48x60"
  ],
  "Kubota|KX 015-4": [
    "230x96x32",
    "230x48x64"
  ],
  "Kubota|KX 016-4": [
    "230x96x32",
    "230x48x64"
  ],
  "Kubota|KX 018-4": [
    "230x48x70"
  ],
  "Kubota|KX 019-4": [
    "230x48x70"
  ],
  "Kubota|KX 021 [OEM 250x109x35]": [
    "250x109x35",
    "250x109x37"
  ],
  "Kubota|KX 021UR": [
    "250x19x37",
    "250x52.5x76",
    "300x52.5x76"
  ],
  "Kubota|KX 024": [
    "250x109x35",
    "300x52.5x72"
  ],
  "Kubota|KX 026": [
    "300x109x35",
    "300x52.5x72"
  ],
  "Kubota|KX 027": [
    "300x109x37",
    "250x52.5x76",
    "300x52.5x76"
  ],
  "Kubota|KX 027-4": [
    "300x53x80"
  ],
  "Kubota|KX 030 [OEM 300x109x39]": [
    "300x109x39",
    "300x109x41"
  ],
  "Kubota|KX 030-4": [
    "300x53x80"
  ],
  "Kubota|KX 033 [OEM 300x109x39]": [
    "300x109x39",
    "300x109x41"
  ],
  "Kubota|KX 033-4": [
    "300x53x84"
  ],
  "Kubota|KX 037-4": [
    "300x53x84"
  ],
  "Kubota|KX 040": [
    "400x142x37",
    "400x72.5x72"
  ],
  "Kubota|KX 040-4": [
    "350x54.5x86"
  ],
  "Kubota|KX 040-4HGA": [
    "350x54.5x86"
  ],
  "Kubota|KX 041": [
    "230x96x30",
    "230x48x60"
  ],
  "Kubota|KX 042-4": [
    "350x54.5x86"
  ],
  "Kubota|KX 045": [
    "400x142x37",
    "400x72.5x72"
  ],
  "Kubota|KX 057-4": [
    "400x72.5x74"
  ],
  "Kubota|KX 057-5": [
    "400x72.5x74"
  ],
  "Kubota|KX 060-5": [
    "400x72.5x74"
  ],
  "Kubota|KX 080": [
    "450x81.5x76",
    "450x81x76"
  ],
  "Kubota|KX 080-3": [
    "450x81.5x76",
    "450x81x76"
  ],
  "Kubota|KX 080-4": [
    "450x81.5x76",
    "450x81x76"
  ],
  "Kubota|KX 100-5": [
    "500x92x78"
  ],
  "Kubota|KX 101": [
    "300x109x41",
    "300x52.5x84"
  ],
  "Kubota|KX 101-3": [
    "300x53x84"
  ],
  "Kubota|KX 101-3&2": [
    "300x53x84"
  ],
  "Kubota|KX 101-3&3": [
    "300x53x84"
  ],
  "Kubota|KX 101-3&4": [
    "300x53x84"
  ],
  "Kubota|KX 12": [
    "200x96x30",
    "230x48x60"
  ],
  "Kubota|KX 120-5": [
    "500x92x84"
  ],
  "Kubota|KX 121-2": [
    "350x56x84",
    "350x52.5x88"
  ],
  "Kubota|KX 121-2S": [
    "350x56x84",
    "350x52.5x88"
  ],
  "Kubota|KX 121-3": [
    "350x54.5x86"
  ],
  "Kubota|KX 121-3&": [
    "350x54.5x86"
  ],
  "Kubota|KX 151": [
    "400x142x37",
    "400x72.5x72"
  ],
  "Kubota|KX 161-2": [
    "400x72.5x72"
  ],
  "Kubota|KX 161-2S": [
    "400x72.5x72"
  ],
  "Kubota|KX 161-2SR": [
    "400x72.5x72"
  ],
  "Kubota|KX 161-3": [
    "400x72.5x74"
  ],
  "Kubota|KX 161-3&": [
    "400x72.5x74"
  ],
  "Kubota|KX 161-3CX": [
    "400x72.5x74"
  ],
  "Kubota|KX 21": [
    "180x72x39"
  ],
  "Kubota|KX 251": [
    "450x71x86"
  ],
  "Kubota|KX 251N2PG": [
    "450x71x86"
  ],
  "Kubota|KX 28": [
    "200x96x30",
    "230x48x60"
  ],
  "Kubota|KX 36": [
    "200x96x30",
    "230x48x60"
  ],
  "Kubota|KX 36-2": [
    "200x96x30",
    "230x96x30",
    "230x48x60"
  ],
  "Kubota|KX 36-3": [
    "230x96x32",
    "230x48x64"
  ],
  "Kubota|KX 36-3GL": [
    "230x96x32",
    "230x48x64"
  ],
  "Kubota|KX 36-3HGL": [
    "230x96x32",
    "230x48x64"
  ],
  "Kubota|KX 36HG": [
    "230x96x30",
    "230x48x60"
  ],
  "Kubota|KX 41": [
    "230x96x30",
    "230x48x60"
  ],
  "Kubota|KX 41-2": [
    "230x96x30",
    "230x48x60"
  ],
  "Kubota|KX 41-2S": [
    "230x96x32",
    "230x48x64"
  ],
  "Kubota|KX 41-2SC": [
    "230x96x32",
    "230x48x64"
  ],
  "Kubota|KX 41-2SV": [
    "230x96x35",
    "230x48x70"
  ],
  "Kubota|KX 41-2V": [
    "230x96x35",
    "230x48x70"
  ],
  "Kubota|KX 41-2VC": [
    "230x96x35",
    "230x48x70"
  ],
  "Kubota|KX 41-3 [S/N < 20972]": [
    "230x48x70"
  ],
  "Kubota|KX 41-3 [S/N > 30001]": [
    "230x48x70"
  ],
  "Kubota|KX 41-3S": [
    "230x96x32",
    "230x48x64"
  ],
  "Kubota|KX 41-3SGL": [
    "230x96x32",
    "230x48x64"
  ],
  "Kubota|KX 41-3V(2009)": [
    "230x96x35",
    "230x48x70"
  ],
  "Kubota|KX 41-3V(2010 & UP)": [
    "230x48x70"
  ],
  "Kubota|KX 41-3VGL": [
    "230x96x35",
    "230x48x70"
  ],
  "Kubota|KX 41HG": [
    "230x96x30",
    "230x48x60"
  ],
  "Kubota|KX 41L": [
    "230x96x30",
    "230x48x60"
  ],
  "Kubota|KX 51": [
    "250x109x35",
    "300x52.5x72"
  ],
  "Kubota|KX 61": [
    "250x109x35",
    "300x52.5x72"
  ],
  "Kubota|KX 61-2": [
    "250x109x37",
    "250x52.5x76",
    "300x52.5x76"
  ],
  "Kubota|KX 61-2&": [
    "250x109x37",
    "250x52.5x76",
    "300x52.5x76"
  ],
  "Kubota|KX 61-2S": [
    "250x109x37",
    "250x52.5x76",
    "300x52.5x76"
  ],
  "Kubota|KX 61-3": [
    "300x53x80"
  ],
  "Kubota|KX 71": [
    "300x109x35",
    "300x52.5x72"
  ],
  "Kubota|KX 71-2": [
    "300x109x39",
    "300x52.5x80"
  ],
  "Kubota|KX 71-2&": [
    "300x109x39",
    "300x52.5x80"
  ],
  "Kubota|KX 71-3": [
    "300x53x80"
  ],
  "Kubota|KX 71-3GL": [
    "300x53x80"
  ],
  "Kubota|KX 75UR": [
    "450x81x76",
    "450x81x76"
  ],
  "Kubota|KX 80": [
    "450x81x76",
    "450x81x76"
  ],
  "Kubota|KX 90": [
    "300x109x41",
    "300x52.5x84"
  ],
  "Kubota|KX 91-2": [
    "300x109x39",
    "300x52.5x80"
  ],
  "Kubota|KX 91-2S": [
    "300x109x39",
    "300x52.5x80"
  ],
  "Kubota|KX 91-2SR": [
    "300x109x39",
    "300x52.5x80"
  ],
  "Kubota|KX 91-3": [
    "300x53x80"
  ],
  "Kubota|KX 91-3&": [
    "300x53x80"
  ],
  "Kubota|KX 91-3&-2": [
    "300x53x80"
  ],
  "Kubota|KXB 300": [
    "180x72x37"
  ],
  "Kubota|RX 141": [
    "230x96x35",
    "230x48x70"
  ],
  "Kubota|RX 201": [
    "250x109x37",
    "250x52.5x76",
    "300x52.5x76"
  ],
  "Kubota|RX 202": [
    "250x96x41",
    "250x47x84",
    "250x48x82"
  ],
  "Kubota|RX 301": [
    "300x109x41",
    "300x52.5x84"
  ],
  "Kubota|RX 301UR": [
    "300x109x41",
    "300x52.5x84"
  ],
  "Kubota|RX 302": [
    "300x52.5x84"
  ],
  "Kubota|RX 303": [
    "300x109x41",
    "300x52.5x84"
  ],
  "Kubota|RX 501": [
    "400x142x38",
    "400x72.5x74"
  ],
  "Kubota|RX 502": [
    "400x72.5x74"
  ],
  "Kubota|RX 502VA": [
    "400x72.5x74"
  ],
  "Kubota|SVL 65-2 (Compact Track Loader)": [
    "320x86x52",
    "380x86x52",
    "400x86x52"
  ],
  "Kubota|SVL 75 (Compact Track Loader)": [
    "320x86x52",
    "380x86x52",
    "400x86x52"
  ],
  "Kubota|SVL 75-2 (Compact Track Loader)": [
    "320x86x52",
    "380x86x52",
    "400x86x52"
  ],
  "Kubota|SVL 75-3 (Compact Track Loader)": [
    "320x86x52",
    "400x86x52"
  ],
  "Kubota|SVL 90 (Compact Track Loader)": [
    "450x86x58"
  ],
  "Kubota|SVL 90-2 (Compact Track Loader)": [
    "450x86x58"
  ],
  "Kubota|SVL 95 (Compact Track Loader)": [
    "450x86x58"
  ],
  "Kubota|SVL 95-2 (Compact Track Loader)": [
    "450x86x58"
  ],
  "Kubota|SVL 95-2s (Compact Track Loader)": [
    "450x86x58"
  ],
  "Kubota|SVL 97-2 (Compact Track Loader)": [
    "450x86x58"
  ],
  "Kubota|U-008": [
    "180x72x37"
  ],
  "Kubota|U-10": [
    "180x72x40"
  ],
  "Kubota|U-10-3": [
    "180x72x40"
  ],
  "Kubota|U-10-5": [
    "180x72x40"
  ],
  "Kubota|U-15": [
    "230x96x35",
    "23x48x70"
  ],
  "Kubota|U-15 Lotus root": [
    "230x96x35",
    "230x48x70"
  ],
  "Kubota|U-15-3": [
    "230x96x35",
    "230x48x70"
  ],
  "Kubota|U-17": [
    "230x48x70"
  ],
  "Kubota|U-17-3": [
    "230x48x70"
  ],
  "Kubota|U-17-3&": [
    "230x48x70"
  ],
  "Kubota|U-20": [
    "250x96x41",
    "250x47x84",
    "250x48x82"
  ],
  "Kubota|U-20 (Korean model)": [
    "250x109x35",
    "300x52.5x72"
  ],
  "Kubota|U-20-3": [
    "250x47x84",
    "250x48x82"
  ],
  "Kubota|U-20-3&": [
    "250x47x84",
    "250x48x82"
  ],
  "Kubota|U-20-3V": [
    "250x47x84",
    "250x48x82"
  ],
  "Kubota|U-20-3VHG": [
    "250x47x84",
    "250x48x82"
  ],
  "Kubota|U-25-3": [
    "300x53x80"
  ],
  "Kubota|U-25-3G": [
    "300x53x80"
  ],
  "Kubota|U-25-3GL": [
    "300x53x80"
  ],
  "Kubota|U-27-4": [
    "300x53x80"
  ],
  "Kubota|U-30": [
    "300x52.5x84"
  ],
  "Kubota|U-30-1": [
    "300x52.5x84"
  ],
  "Kubota|U-30-2": [
    "300x52.5x84"
  ],
  "Kubota|U-30-3": [
    "300x53x84"
  ],
  "Kubota|U-30-5S": [
    "300x52.5x84"
  ],
  "Kubota|U-30-6S": [
    "300x52.5x84"
  ],
  "Kubota|U-30HG": [
    "300x52.5x84"
  ],
  "Kubota|U-35": [
    "300x53x84"
  ],
  "Kubota|U-35&": [
    "300x53x84"
  ],
  "Kubota|U-35-3": [
    "300x53x84"
  ],
  "Kubota|U-35-3&": [
    "300x53x84"
  ],
  "Kubota|U-35-3&2": [
    "300x53x84"
  ],
  "Kubota|U-35-3G": [
    "300x53x84"
  ],
  "Kubota|U-35-3GAI": [
    "300x53x84"
  ],
  "Kubota|U-35-3HG": [
    "300x53x84"
  ],
  "Kubota|U-35-4": [
    "300x53x84"
  ],
  "Kubota|U-35HG": [
    "300x53x84"
  ],
  "Kubota|U-35SS (Super Series)": [
    "300x53x84"
  ],
  "Kubota|U-36-4": [
    "300x53x84"
  ],
  "Kubota|U-40": [
    "400x72.5x74"
  ],
  "Kubota|U-45": [
    "400x72.5x72",
    "400x75.2x72"
  ],
  "Kubota|U-45-3": [
    "400x72.5x74"
  ],
  "Kubota|U-45G": [
    "400x72.5x72",
    "400x75.2x72"
  ],
  "Kubota|U-45VA": [
    "400x72.5x74"
  ],
  "Kubota|U-48-4": [
    "400x72.5x74"
  ],
  "Kubota|U-50-3": [
    "400x72.5x74"
  ],
  "Kubota|U-50-5": [
    "400x72.5x74"
  ],
  "Kubota|U-55": [
    "400x72.5x74"
  ],
  "Kubota|U-55-4": [
    "400x72.5x74"
  ],
  "Kubota|U-55-4 S": [
    "400x72.5x74"
  ],
  "Kubota|U-55-5": [
    "400x72.5x74"
  ],
  "Kubota|U-56-5": [
    "400x72.5x74"
  ],
  "Kubota|UX 30": [
    "300x52.5x84"
  ],
  "Link-Belt|LS 1600C": [
    "450x73.5x80",
    "450x71x82"
  ],
  "Link-Belt|Quantum 1600": [
    "450x73.5x80",
    "450x71x82"
  ],
  "MBU|D 400": [
    "180x72x37"
  ],
  "MBU|D 500": [
    "180x72x37"
  ],
  "Macanizacion Y Mineria Sa|MYMC": [
    "230x72x43"
  ],
  "Macanizacion Y Mineria Sa|MYMP6": [
    "300x55x78",
    "300x52.5x80"
  ],
  "Macmoter|L 6C": [
    "400x73x74",
    "400x72.5x74"
  ],
  "Macmoter|M 1": [
    "250x72x45"
  ],
  "Macmoter|M 1 Miniropa": [
    "250x72x45"
  ],
  "Macmoter|M 1 S": [
    "250x72x45"
  ],
  "Macmoter|M 2": [
    "250x72x45"
  ],
  "Macmoter|MB 135S": [
    "250x72x45"
  ],
  "Madro|OMH-400": [
    "230x72x43"
  ],
  "Madro|SMH-400": [
    "230x72x43"
  ],
  "Maeda|M-104C": [
    "180x72x40"
  ],
  "Maeda|MC104C": [
    "180x72x40"
  ],
  "Maeda|MC104CR": [
    "180x72x40"
  ],
  "Maeda|MC174": [
    "180x72x40"
  ],
  "Manitou|1.16S": [
    "230x72x43"
  ],
  "Manitou|1650RT": [
    "320x86x49"
  ],
  "Manitou|1850RT": [
    "320x86x54",
    "400x86x54"
  ],
  "Manitou|2100RT": [
    "450x86x56"
  ],
  "Manitou|2150RT": [
    "450x86x56"
  ],
  "Manitou|3200VT": [
    "450x86x58"
  ],
  "Manitou|RT105": [
    "250x72x52"
  ],
  "Manitou|RT135": [
    "300x84x46",
    "300x86x45"
  ],
  "Massey Ferguson|MF 114": [
    "230x96x31",
    "230x48x62"
  ],
  "Massey Ferguson|MF 115": [
    "230x96x31",
    "230x48x62"
  ],
  "Massey Ferguson|MF 123": [
    "250x109x35",
    "300x52.5x72"
  ],
  "Massey Ferguson|MF 125": [
    "300x109x38",
    "300x52.5x78"
  ],
  "Massey Ferguson|MF 128": [
    "300x109x38",
    "300x52.5x78"
  ],
  "Massey Ferguson|MF 130": [
    "300x109x40",
    "300x52.5x82"
  ],
  "Massey Ferguson|MF 131": [
    "300x109x40",
    "300x52.5x82"
  ],
  "Massey Ferguson|MF 135": [
    "350x108x42",
    "350x52.5x86"
  ],
  "Massey Ferguson|MF 145": [
    "400x72.5x72",
    "400x72.5x73"
  ],
  "Massey Ferguson|MF 150": [
    "400x72.5x72",
    "400x72.5x73"
  ],
  "Maweco|1003": [
    "250x72x47",
    "230x72x44"
  ],
  "Maweco|1302": [
    "280x72x47",
    "250x72x47"
  ],
  "Maweco|403": [
    "200x72x34",
    "180x72x34"
  ],
  "Maweco|703": [
    "200x72x34",
    "180x72x34"
  ],
  "Maweco|TC 10": [
    "230x72x43"
  ],
  "Maweco|YB 10": [
    "230x72x43"
  ],
  "Maxima|TB 15": [
    "230x72x43"
  ],
  "Mc Connel|Robocut": [
    "250x72x47"
  ],
  "Mc Elory|TracStar 28": [
    "180x72x42"
  ],
  "Mc Elory|TracStar 412": [
    "180x72x42"
  ],
  "Mc Elory|TracStar 500": [
    "230x72x42"
  ],
  "Mc Elory|TracStar 618": [
    "180x72x42"
  ],
  "Mc Elory|TracStar 900": [
    "300x100x43",
    "300x52.5x82"
  ],
  "Mecalac|10 MCR": [
    "450x76x84"
  ],
  "Mecalac|6 MCR": [
    "400x73x74",
    "400x72.5x74"
  ],
  "Mecalac|8MCR ('2010)": [
    "450x71x84"
  ],
  "Mecanica Benassi|MB 300": [
    "180x60x35"
  ],
  "Mecanica Benassi|MB 350": [
    "180x60x35"
  ],
  "Mecanica Benassi|MB 500": [
    "180x60x37"
  ],
  "Mecbo|P2800-BR.8": [
    "250x72x52"
  ],
  "Meinl|Hamster": [
    "200x72x37",
    "180x72x37"
  ],
  "Menzi Muck|C14": [
    "200x72x42"
  ],
  "Menzi Muck|C19": [
    "200x72x42"
  ],
  "Merlo|M4-2": [
    "180x72x37"
  ],
  "Merlo|M4-3 Turbo": [
    "180x72x41"
  ],
  "Merlo|M6 ('2002)": [
    "180x72x35"
  ],
  "Merlo|M8": [
    "180x72x35"
  ],
  "Merlo|M8-2 Plus Dumper": [
    "180x72x35"
  ],
  "Merlo|M8-2 Plus Mixer": [
    "180x72x36"
  ],
  "Mertz|PX 10": [
    "200x72x36",
    "180x72x36"
  ],
  "Mertz|PX 17": [
    "200x72x36",
    "180x72x36"
  ],
  "Messersi|CH1": [
    "180x72x34"
  ],
  "Messersi|CH2": [
    "180x72x34"
  ],
  "Messersi|CH2/N13D": [
    "180x72x37"
  ],
  "Messersi|CH2/R13": [
    "180x72x37"
  ],
  "Messersi|CH2R Carrier": [
    "180x72x37"
  ],
  "Messersi|CH2R Mixer": [
    "180x72x37"
  ],
  "Messersi|CH3": [
    "180x72x34"
  ],
  "Messersi|CM 1": [
    "180x72x34"
  ],
  "Messersi|M 08": [
    "180x72x37"
  ],
  "Messersi|M 08E": [
    "230x72x45"
  ],
  "Messersi|M 10E": [
    "180x72x37"
  ],
  "Messersi|M 13": [
    "230x72x45"
  ],
  "Messersi|M 15": [
    "230x72x45",
    "230x72x44"
  ],
  "Messersi|M 16": [
    "230x72x45"
  ],
  "Messersi|M 16BV": [
    "230x96x33",
    "230x48x66"
  ],
  "Messersi|M 16U": [
    "230x96x33",
    "230x48x66"
  ],
  "Messersi|M 18": [
    "230x72x45"
  ],
  "Messersi|M 18BE": [
    "230x96x33",
    "230x48x66"
  ],
  "Messersi|M 18BE/C": [
    "230x96x32",
    "230x48x64"
  ],
  "Messersi|M 20": [
    "230x72x45"
  ],
  "Messersi|M 22U": [
    "250x96x40",
    "250x48x80"
  ],
  "Messersi|M 25": [
    "300x55x72",
    "300x52.5x74"
  ],
  "Messersi|M 28": [
    "300x55x72",
    "300x52.5x74"
  ],
  "Messersi|M 28P": [
    "300x55x72",
    "300x52.5x74"
  ],
  "Messersi|M 30": [
    "300x55x78",
    "300x52.5x80"
  ],
  "Messersi|M 32": [
    "300x54x80",
    "300x52.5x82"
  ],
  "Messersi|M 35": [
    "300x55x78",
    "300x52.5x80"
  ],
  "Messersi|M 35P/C": [
    "300x54x80",
    "300x52.5x82"
  ],
  "Messersi|M 50": [
    "400x72.5x72"
  ],
  "Messersi|M 50P": [
    "400x72.5x72"
  ],
  "Messersi|TCH 05": [
    "180x72x34"
  ],
  "Messersi|TCH 07D": [
    "180x72x34"
  ],
  "Messersi|TCH 09": [
    "180x72x34"
  ],
  "Messersi|TCH 10D": [
    "180x72x34"
  ],
  "Messersi|TCH 12": [
    "230x72x52"
  ],
  "Messersi|TCH 13": [
    "180x72x34"
  ],
  "Messersi|TCH 15": [
    "230x72x52"
  ],
  "Messersi|TCH 1500": [
    "230x72x52"
  ],
  "Messersi|TCH 15S": [
    "230x72x52"
  ],
  "Messersi|TCH R16D": [
    "180x73x37",
    "180x72x37"
  ],
  "Mini Mustang|MM18": [
    "230x72x43"
  ],
  "Minicarrier|TL 10": [
    "230x72x43"
  ],
  "Minicarrier|YB 10": [
    "230x72x43"
  ],
  "Minicarrier|YEW 5D1": [
    "250x72x45"
  ],
  "Minicarrier|YFW 5": [
    "250x72x45"
  ],
  "Minidig|G 500": [
    "180x72x34"
  ],
  "Minidig|GR 700A": [
    "190x72x37",
    "180x72x37"
  ],
  "Minidig|GR 900": [
    "190x72x37",
    "180x72x37"
  ],
  "Mintrac|1003": [
    "250x72x52",
    "230x72x44"
  ],
  "Mintrac|1302": [
    "280x72x48",
    "250x72x48"
  ],
  "Mintrac|403": [
    "230x72x43"
  ],
  "Mintrac|703": [
    "200x72x34",
    "180x72x34"
  ],
  "Mintrac|709": [
    "200x72x34",
    "180x72x34"
  ],
  "Mintrac|808": [
    "230x72x42"
  ],
  "Mira|HD 190-1": [
    "180x72x38"
  ],
  "Mitsubishi|ME 15": [
    "230x96x33",
    "230x48x66"
  ],
  "Mitsubishi|ME 30": [
    "300x52.5x80",
    "300x52.5x80"
  ],
  "Mitsubishi|MM 20": [
    "300x52.5x74"
  ],
  "Mitsubishi|MM 25": [
    "300x52.5x76",
    "300x109x35",
    "300x52.5x72"
  ],
  "Mitsubishi|MM 30CR": [
    "300x52.5x80"
  ],
  "Mitsubishi|MM 35": [
    "300x109x41",
    "300x52.5x84"
  ],
  "Mitsubishi|MM 35A": [
    "300x109x41",
    "300x52.5x84"
  ],
  "Mitsubishi|MM 35B": [
    "300x109x41",
    "300x52.5x84"
  ],
  "Mitsubishi|MM 35T": [
    "300x109x41",
    "300x52.5x84"
  ],
  "Mitsubishi|MM 40": [
    "300x52.5x84"
  ],
  "Mitsubishi|MM 40SR": [
    "300x52.5x84"
  ],
  "Mitsubishi|MM 45B": [
    "400x73x72",
    "400x72.5x72"
  ],
  "Mitsubishi|MM 55SR": [
    "400x73x72",
    "400x72.5x72"
  ],
  "Mitsubishi|MS 010": [
    "250x72x45"
  ],
  "Mitsubishi|MX 35": [
    "300x109x39",
    "300x52.5x80"
  ],
  "Mitsubishi|MX 45": [
    "400x142x36",
    "400x72.5x70"
  ],
  "Monitor|1275": [
    "200x72x47"
  ],
  "Monitor|43T": [
    "400x72.5x82"
  ],
  "Mopas|ME35": [
    "300x109x39",
    "300x52.5x80"
  ],
  "Morath|BR 1800": [
    "250x72x57"
  ],
  "Morooka|CG 65": [
    "700x100x98"
  ],
  "Morooka|MST 1500": [
    "700x100x98"
  ],
  "Morooka|MST 1500-P": [
    "700x100x98"
  ],
  "Morooka|MST 1500E": [
    "700x100x98"
  ],
  "Morooka|MST 1500V": [
    "700x100x98"
  ],
  "Morooka|MST 1500VD": [
    "700x100x98"
  ],
  "Morooka|MST 1700": [
    "700x100x98"
  ],
  "Morooka|MST 1900": [
    "700x100x98"
  ],
  "Morooka|MST 2200": [
    "750x150x66"
  ],
  "Morooka|MST 2200V": [
    "750x150x66"
  ],
  "Morooka|MST 2200VD": [
    "750x150x66"
  ],
  "Morooka|MST 2300": [
    "750x150x66"
  ],
  "Morooka|MST 600V": [
    "500x90x78"
  ],
  "Morooka|MST 600VD": [
    "500x100x65",
    "500x90x78"
  ],
  "Morooka|Track Carrier 1500": [
    "700x100x98"
  ],
  "Morooka|Track Carrier 2200": [
    "750x150x66"
  ],
  "Multidrill|ML (HD Drilling Machine)": [
    "250x72x52"
  ],
  "Multidrill|PL (HD Drilling Machine)": [
    "230x96x32",
    "230x48x64"
  ],
  "Multidrill|SL (HD Drilling Machine)": [
    "180x72x34"
  ],
  "Multidrill|XL (HD Drilling Machine)": [
    "300x52.5x82",
    "300x52.5x82"
  ],
  "Multitel|SMX250.E": [
    "200x72x45"
  ],
  "Mustang|1000M": [
    "485x92x72"
  ],
  "Mustang|1650 RT": [
    "320x86x49"
  ],
  "Mustang|170Z": [
    "230x72x46"
  ],
  "Mustang|1750 RT": [
    "320x86x54"
  ],
  "Mustang|1850 RT": [
    "320x86x54",
    "400x86x54"
  ],
  "Mustang|2040": [
    "320x86x50",
    "375x86x50",
    "400x86x50"
  ],
  "Mustang|2042": [
    "320x86x50",
    "375x86x50",
    "400x86x50"
  ],
  "Mustang|2044": [
    "320x86x50",
    "375x86x50",
    "400x86x50"
  ],
  "Mustang|2050": [
    "320x86x50",
    "375x86x50",
    "400x86x50"
  ],
  "Mustang|2054": [
    "320x86x52",
    "375x86x52",
    "400x86x52"
  ],
  "Mustang|2060": [
    "320x86x52",
    "375x86x52",
    "400x86x52"
  ],
  "Mustang|2066": [
    "320x86x54",
    "375x86x54",
    "400x86x54"
  ],
  "Mustang|2070": [
    "450x86x56"
  ],
  "Mustang|2076": [
    "320x86x54",
    "375x86x54",
    "400x86x54",
    "450x86x54"
  ],
  "Mustang|2086": [
    "450x86x58"
  ],
  "Mustang|2095": [
    "450x86x63"
  ],
  "Mustang|2099": [
    "450x86x63"
  ],
  "Mustang|2100RT": [
    "450x86x56"
  ],
  "Mustang|2105": [
    "450x86x63"
  ],
  "Mustang|2109": [
    "450x86x63"
  ],
  "Mustang|2500RT": [
    "450x86x58"
  ],
  "Mustang|250Z": [
    "250x55.5x79"
  ],
  "Mustang|3200VT": [
    "450x86x58"
  ],
  "Mustang|350ZNXT2": [
    "300x55x84",
    "300x52.5x88"
  ],
  "Mustang|3803ZT": [
    "300x52.5x84"
  ],
  "Mustang|450ZNXT2": [
    "350x75.5x74",
    "400x75.5x74"
  ],
  "Mustang|5003Z": [
    "400x72.5x74"
  ],
  "Mustang|5003ZT": [
    "400x73x74",
    "400x72.5x74"
  ],
  "Mustang|7503": [
    "450x71x86"
  ],
  "Mustang|7503ZT": [
    "450x71x86"
  ],
  "Mustang|ME 1402": [
    "230x96x33",
    "230x48x66"
  ],
  "Mustang|ME 1502": [
    "230x96x33",
    "230x48x66"
  ],
  "Mustang|ME 1503": [
    "230x96x36",
    "230x48x72"
  ],
  "Mustang|ME 1902": [
    "230x96x36",
    "230x48x72"
  ],
  "Mustang|ME 1903": [
    "250x96x38",
    "250x48x76"
  ],
  "Mustang|ME 2202": [
    "230x96x36",
    "230x48x72"
  ],
  "Mustang|ME 2203": [
    "250x96x38",
    "250x48x76"
  ],
  "Mustang|ME 2503": [
    "250x109x37",
    "300x52.5x76"
  ],
  "Mustang|ME 2702": [
    "320x54x72",
    "300x52.5x74"
  ],
  "Mustang|ME 2902": [
    "320x54x72",
    "300x52.5x74"
  ],
  "Mustang|ME 3003": [
    "300x109x38",
    "300x52.5x78"
  ],
  "Mustang|ME 3402": [
    "320x54x78",
    "300x52.5x80"
  ],
  "Mustang|ME 3503": [
    "300x109x41",
    "300x52.5x84"
  ],
  "Mustang|ME 3602": [
    "320x54x78",
    "300x52.5x80"
  ],
  "Mustang|ME 3703": [
    "300x109x41",
    "300x52.5x84"
  ],
  "Mustang|ME 5002": [
    "400x73x74",
    "400x72.5x74"
  ],
  "Mustang|ME 5003": [
    "400x72.5x74"
  ],
  "Mustang|ME 6002": [
    "400x73x74",
    "400x72.5x74"
  ],
  "Mustang|ME 6003": [
    "400x73x74",
    "400x72.5x74"
  ],
  "Mustang|ME 6502": [
    "400x73x74",
    "400x72.5x74"
  ],
  "Mustang|ME 8002": [
    "450x71x84"
  ],
  "Mustang|MTL 16": [
    "320x86x52"
  ],
  "Mustang|MTL 20": [
    "450x100x48"
  ],
  "Mustang|MTL 25": [
    "450x100x50"
  ],
  "Mustang|MTL 312": [
    "320x86x46"
  ],
  "Mustang|MTL 316": [
    "320x86x52"
  ],
  "Mustang|MTL 320": [
    "450x100x48"
  ],
  "Mustang|MTL 325": [
    "450x100x50"
  ],
  "Mustang|RD 15": [
    "250x72x52"
  ],
  "Nagano|NB 30": [
    "300x55x78",
    "300x52.5x80"
  ],
  "Nagano|NS 08-2": [
    "180x72x36",
    "180x72x38"
  ],
  "Nagano|NS 15": [
    "230x96x33",
    "230x48x66"
  ],
  "Nagano|NS 15-2": [
    "230x96x33",
    "230x48x66"
  ],
  "Nagano|NS 15-3": [
    "230x48x66",
    "230x96x33"
  ],
  "Nagano|NS 16-3": [
    "230x48x66",
    "230x96x33"
  ],
  "Nagano|NS 25": [
    "300x55x72",
    "300x52.5x74"
  ],
  "Nagano|NS 30": [
    "300x55x78",
    "300x52.5x80"
  ],
  "Nagano|NS 35": [
    "300x55x78",
    "300x52.5x80"
  ],
  "Nagano|NS 35-2": [
    "300x55x82",
    "300x52.5x84"
  ],
  "Nagano|NS 35-2A": [
    "300x52.5x86",
    "300x52.5x86"
  ],
  "Nagano|NS 35-2B": [
    "300x52.5x84",
    "300x52.5x84"
  ],
  "Nagano|NS 75-2": [
    "450x71x86"
  ],
  "Nagano Highland|NB 30": [
    "300x55x78",
    "300x52.5x80"
  ],
  "Nagano Highland|NS 15-2": [
    "230x96x33",
    "230x48x66"
  ],
  "Nagano Highland|NS 45-2": [
    "400x72.5x72"
  ],
  "Nante|NT 110": [
    "180x72x37"
  ],
  "Nante|NT 12": [
    "180x72x37"
  ],
  "Nante|NT 15": [
    "230x48x62",
    "230x72x43"
  ],
  "Nante|NT 16": [
    "230x48x66",
    "230x96x33"
  ],
  "Nante|NT 18": [
    "230x48x64",
    "230x96x32"
  ],
  "Nante|NT 18D": [
    "230x48x66",
    "230x96x33"
  ],
  "Nante|NT 30U": [
    "300x55x82",
    "300x52.5x84"
  ],
  "Navago|19/9 ('2001)": [
    "250x72x52"
  ],
  "Navigator|D7x11a": [
    "230x72x54"
  ],
  "Nemag|Mini-excavator": [
    "180x72x34"
  ],
  "Nemek|407 RT": [
    "450x71x82"
  ],
  "Nemek|407 TS": [
    "450x71x82"
  ],
  "New Holland|C 175": [
    "320x86x50"
  ],
  "New Holland|C 180": [
    "400x86x55"
  ],
  "New Holland|C 185": [
    "450x86x55",
    "400x86x55"
  ],
  "New Holland|C 190": [
    "450x86x55",
    "400x86x55"
  ],
  "New Holland|C 227": [
    "320x86x50"
  ],
  "New Holland|C 232": [
    "450x86x55"
  ],
  "New Holland|C 234": [
    "450x86x55"
  ],
  "New Holland|C 237": [
    "450x86x55"
  ],
  "New Holland|C 238": [
    "450x86x55"
  ],
  "New Holland|C 245": [
    "450x86x55"
  ],
  "New Holland|C 327": [
    "320x86x50"
  ],
  "New Holland|C 332": [
    "450x86x55"
  ],
  "New Holland|C 334": [
    "450x86x55"
  ],
  "New Holland|C 337": [
    "450x86x55"
  ],
  "New Holland|C 345": [
    "450x86x55"
  ],
  "New Holland|E 115": [
    "500x92x78"
  ],
  "New Holland|E 16": [
    "230x48x70"
  ],
  "New Holland|E 17": [
    "230x48x70"
  ],
  "New Holland|E 17C": [
    "230x48x70"
  ],
  "New Holland|E 18": [
    "230x48x70"
  ],
  "New Holland|E 18C": [
    "230x48x70"
  ],
  "New Holland|E 18SR": [
    "230x48x70"
  ],
  "New Holland|E 20.2SR": [
    "250x52.5x76",
    "300x52.5x76"
  ],
  "New Holland|E 20SR": [
    "250x52.5x72",
    "300x52.5x72"
  ],
  "New Holland|E 22.2SR": [
    "250x52.5x76",
    "300x52.5x76"
  ],
  "New Holland|E 25SR": [
    "250x52.5x76",
    "300x52.5x76"
  ],
  "New Holland|E 26BSR": [
    "250x52.5x76",
    "300x52.5x76"
  ],
  "New Holland|E 26C": [
    "250x52.5x78"
  ],
  "New Holland|E 27.2SR": [
    "250x52.5x80",
    "300x52.5x80"
  ],
  "New Holland|E 29 BSR": [
    "250x52.5x80",
    "300x52.5x80"
  ],
  "New Holland|E 30.2SR": [
    "300x52.5x82"
  ],
  "New Holland|E 30C": [
    "300x52.5x80"
  ],
  "New Holland|E 30SR": [
    "300x52.5x82"
  ],
  "New Holland|E 33C": [
    "300x52.5x86"
  ],
  "New Holland|E 35.2C": [
    "300x52.5x88",
    "300x52.5x88"
  ],
  "New Holland|E 35.2SR": [
    "300x52.5x88"
  ],
  "New Holland|E 35BSR": [
    "300x52.5x82"
  ],
  "New Holland|E 35SR": [
    "300x52.5x88"
  ],
  "New Holland|E 37C": [
    "300x52.5x86"
  ],
  "New Holland|E 39BSR": [
    "300x52.5x88",
    "300x52.5x88"
  ],
  "New Holland|E 40.2SR": [
    "400x74x68",
    "400x72.5x70"
  ],
  "New Holland|E 40SR": [
    "400x74x68",
    "400x72.5x70"
  ],
  "New Holland|E 45.2SR": [
    "400x74x72",
    "400x72.5x73"
  ],
  "New Holland|E 45SR": [
    "400x74x72",
    "400x72.5x73"
  ],
  "New Holland|E 50.2SR": [
    "400x74x72",
    "400x72.5x73"
  ],
  "New Holland|E 50B": [
    "400x74x72",
    "400x72.5x73"
  ],
  "New Holland|E 55BX": [
    "400x72.5x74"
  ],
  "New Holland|E 70BSR": [
    "450x81.5x76",
    "450x81x76"
  ],
  "New Holland|E 70SR": [
    "450x81.5x76",
    "450x81x76"
  ],
  "New Holland|E 75CSR": [
    "450x81.5x76",
    "450x81x76"
  ],
  "New Holland|E 80": [
    "450x81.5x76",
    "450x81x76"
  ],
  "New Holland|E 80BMSR": [
    "450x81.5x76",
    "450x81x76"
  ],
  "New Holland|E 80CS": [
    "450x81.5x76",
    "450x81x76"
  ],
  "New Holland|E 80MSR": [
    "450x81.5x76",
    "450x81x76"
  ],
  "New Holland|EC 15": [
    "230x96x33",
    "230x48x66"
  ],
  "New Holland|EC 25": [
    "300x55x72",
    "300x52.5x74"
  ],
  "New Holland|EC 25SR": [
    "250x52.5x76",
    "300x52.5x76"
  ],
  "New Holland|EC 35SR": [
    "300x52.5x88"
  ],
  "New Holland|EC 45": [
    "400x72.5x72"
  ],
  "New Holland|EC 45SR": [
    "400x74x72",
    "400x72.5x73"
  ],
  "New Holland|EC 60": [
    "400x72.5x76"
  ],
  "New Holland|EH 15B": [
    "230x48x70"
  ],
  "New Holland|EH 16": [
    "230x48x70"
  ],
  "New Holland|EH 18": [
    "230x48x70"
  ],
  "New Holland|EH 25": [
    "300x55x72",
    "300x52.5x74"
  ],
  "New Holland|EH 27B": [
    "250x52.5x80",
    "300x52.5x80"
  ],
  "New Holland|EH 30B": [
    "300x52.5x82",
    "300x52.5x82"
  ],
  "New Holland|EH 35": [
    "350x108x44",
    "350x52.5x90"
  ],
  "New Holland|EH 35B": [
    "300x52.5x88",
    "300x52.5x88"
  ],
  "New Holland|EH 45": [
    "400x72x74",
    "400x72.5x74"
  ],
  "New Holland|EH 50B": [
    "400x72.5x72",
    "400x72.5x72"
  ],
  "New Holland|EH 80": [
    "450x81.5x76",
    "450x81x76"
  ],
  "New Holland|LS 160": [
    "320x86x54",
    "375x86x54",
    "400x86x54"
  ],
  "New Holland|LS 170": [
    "320x86x54",
    "375x86x54",
    "400x86x54"
  ],
  "New Holland|LS 180": [
    "450x86x60"
  ],
  "New Holland|LS 185 B": [
    "450x86x60"
  ],
  "New Holland|LS 190": [
    "450x86x60"
  ],
  "New Holland|LT 175B": [
    "320x86x50"
  ],
  "New Holland|LT 185B": [
    "400x86x55"
  ],
  "New Holland|LT 190B": [
    "400x86x55"
  ],
  "New Holland|LX 865": [
    "450x86x60"
  ],
  "New Holland|LX 885": [
    "450x86x60"
  ],
  "New Holland|LX 985": [
    "450x86x60"
  ],
  "Nibbi|NTR 270": [
    "180x60x34"
  ],
  "Nibbi|NTR 350": [
    "180x60x38"
  ],
  "Nibbi|NTR 450": [
    "180x60x38"
  ],
  "Nibbi|NTR 500": [
    "180x72x34"
  ],
  "Nibbi|NTR 500D": [
    "180x72x34"
  ],
  "Nifty|TD 120TN": [
    "250x72x52"
  ],
  "Nifty|TD 34T": [
    "250x72x52"
  ],
  "Nihon Flex|Snow Plow": [
    "250x72x45"
  ],
  "Nihon Freki|Snow showel": [
    "250x72x45"
  ],
  "Niko|HRS 70": [
    "230x72x52",
    "250x72x52"
  ],
  "Niko|HY 13/11": [
    "180x60x38"
  ],
  "Niko|HY 20/11 70cm": [
    "190x72x38",
    "180x72x38"
  ],
  "Niko|HY 20/11 70cm SOM": [
    "190x72x40",
    "180x72x40"
  ],
  "Niko|HY 27/16": [
    "230x72x43"
  ],
  "Niko|HY 27/16 85cm": [
    "190x72x43",
    "200x72x43"
  ],
  "Niko|HY 30/16": [
    "230x72x43"
  ],
  "Niko|HY 38/16 70cm Poclain": [
    "190x72x45",
    "200x72x45"
  ],
  "Niko|HY 38/16 90cm": [
    "230x72x43"
  ],
  "Niko|HY 38/16A": [
    "230x72x45"
  ],
  "Niko|HY 48/58 2000": [
    "230x72x52"
  ],
  "Niko|HY 610": [
    "190x72x38",
    "180x72x38"
  ],
  "Niko|HY 710": [
    "190x72x38",
    "180x72x38"
  ],
  "Nissan|150/N": [
    "230x96x33",
    "230x48x66"
  ],
  "Nissan|N 050": [
    "180x72x38"
  ],
  "Nissan|N 06": [
    "250x72x45"
  ],
  "Nissan|N 060": [
    "250x72x45"
  ],
  "Nissan|N 080": [
    "180x72x37",
    "180x72x38"
  ],
  "Nissan|N 080 3LR": [
    "180x72x37"
  ],
  "Nissan|N 080-2": [
    "180x72x36",
    "180x72x37"
  ],
  "Nissan|N 080-2LR": [
    "180x72x38"
  ],
  "Nissan|N 120": [
    "250x72x45"
  ],
  "Nissan|N 120-2": [
    "230x96x33",
    "230x48x66"
  ],
  "Nissan|N 120R": [
    "250x72x45"
  ],
  "Nissan|N 150": [
    "230x72x43"
  ],
  "Nissan|N 150-2": [
    "230x96x33",
    "230x48x66"
  ],
  "Nissan|N 150-2R": [
    "230x96x33",
    "230x48x66"
  ],
  "Nissan|N 150R": [
    "230x72x43"
  ],
  "Nissan|N 220-2": [
    "320x109x36",
    "300x52.5x74"
  ],
  "Nissan|N 230-2": [
    "230x96x33",
    "320x109x36"
  ],
  "Nissan|N 230-2R": [
    "320x109x36",
    "300x52.5x74"
  ],
  "Nissan|N 250-2": [
    "320x109x36",
    "300x52.5x74"
  ],
  "Nissan|N 260-2": [
    "320x109x36",
    "300x52.5x74"
  ],
  "Nissan|N 260-2R": [
    "320x109x36",
    "300x52.5x74"
  ],
  "Nissan|N 300-2": [
    "320x109x39",
    "300x52.5x80"
  ],
  "Nissan|N 300-2R": [
    "320x109x39",
    "300x52.5x80"
  ],
  "Nissan|N 35": [
    "300x55x78",
    "300x52.5x80"
  ],
  "Nissan|N 350-2": [
    "320x100x43",
    "320x109x39"
  ],
  "Nissan|N 350-2R": [
    "320x109x39",
    "300x52.5x80"
  ],
  "Nissan|N 80": [
    "180x72x36"
  ],
  "Nissan|N 80-2": [
    "180x72x36"
  ],
  "Nissan|N 80-2R": [
    "180x72x36"
  ],
  "Nissan|S&B 08": [
    "180x72x36"
  ],
  "Nissan|S&B 25-1": [
    "400x72.5x72"
  ],
  "Nissan|S&B 25-2": [
    "400x146x37",
    "400x72.5x74"
  ],
  "Nissan|S&B 300": [
    "320x109x39",
    "300x52.5x80"
  ],
  "Nissan|S&B 300-2": [
    "320x109x39",
    "300x52.5x80"
  ],
  "Nissan|S&B X 1": [
    "300x109x39",
    "320x100x40"
  ],
  "Nissan|X 1": [
    "320x100x38",
    "320x100x40"
  ],
  "Pagani Geotechnical Equipment|TG 63/100": [
    "190x72x37",
    "180x72x37"
  ],
  "Pagani Geotechnical Equipment|TG 63/150": [
    "230x72x43"
  ],
  "Pagani Geotechnical Equipment|TG73/200": [
    "320x100x52"
  ],
  "Palazzani|TSJ 12": [
    "230x96x40",
    "250x48x80"
  ],
  "Palazzani|TSJ 22/24": [
    "250x72x52"
  ],
  "Palazzani|TSJ 23": [
    "230x96x40",
    "250x48x80"
  ],
  "Palazzani|TSJ 24": [
    "230x96x40",
    "250x72x54",
    "250x48x80"
  ],
  "Palazzani|TSJ 24 (2nd type - lifting platform)": [
    "230x96x40",
    "250x48x80"
  ],
  "Palazzani|TSJ 34 (Lifting platform)": [
    "320x100x52"
  ],
  "Palazzani|TSJ 43 (Lifting platform)": [
    "400x72.5x74"
  ],
  "Palazzani|TZ 170 (Lifting platform)": [
    "250x72x52"
  ],
  "Palazzani|XTJ 30/C (Lifting platform)": [
    "320x100x52"
  ],
  "Palazzani|XTJ 48": [
    "450x76x84"
  ],
  "Paus-Hermann|MB 1.6": [
    "230x48x64",
    "230x96x32"
  ],
  "Paus-Hermann|MB 2.0": [
    "250x72x52"
  ],
  "Paus-Hermann|MB 2.4 ('1994)": [
    "250x107.5x37",
    "250x52.5x76",
    "300x52.5x76"
  ],
  "Paus-Hermann|MB 3.2": [
    "300x55x82",
    "300x52.5x84"
  ],
  "Pauselli|500": [
    "230x72x43"
  ],
  "Pauselli|700": [
    "250x72x52"
  ],
  "Pazzaglia|FZ 100 (Tree remover)": [
    "230x72x39"
  ],
  "Pazzaglia|FZ 110 (Tree remover)": [
    "230x72x39"
  ],
  "Pazzaglia|FZ 110 Turbo plus (Tree remover)": [
    "250x72x41"
  ],
  "Pazzaglia|FZ 120 (Tree remover)": [
    "230x72x45"
  ],
  "Pazzaglia|FZ 150 (Tree remover)": [
    "250x72x45"
  ],
  "Pazzaglia|FZ 160 (Tree remover)": [
    "250x72x45"
  ],
  "Pazzaglia|FZ 50 (Tree remover)": [
    "180x72x34"
  ],
  "Pazzaglia|FZ 80 (Tree remover)": [
    "200x72x39"
  ],
  "Pazzaglia|FZ 90 (Tree remover)": [
    "230x72x39"
  ],
  "Peljob|EB 10": [
    "230x72x43"
  ],
  "Peljob|EB 10.4": [
    "230x72x43"
  ],
  "Peljob|EB 11 (New) [OEM 250x72x47]": [
    "250x72x47"
  ],
  "Peljob|EB 11 (Old) [OEM 230x72x43]": [
    "230x72x43"
  ],
  "Peljob|EB 12": [
    "230x72x43"
  ],
  "Peljob|EB 12.4": [
    "230x72x43"
  ],
  "Peljob|EB 14 (New) [OEM 250x72x45]": [
    "250x72x45"
  ],
  "Peljob|EB 14 (Old) [OEM 230x72x43]": [
    "230x72x43"
  ],
  "Peljob|EB 14.2": [
    "230x72x43"
  ],
  "Peljob|EB 14.4 (New) [OEM 250x72x45]": [
    "250x72x45"
  ],
  "Peljob|EB 14.4 (Old) [OEM 230x72x43]": [
    "230x72x43"
  ],
  "Peljob|EB 150": [
    "230x96x33",
    "230x48x66"
  ],
  "Peljob|EB 150XR [OEM 230x72x43]": [
    "230x72x43"
  ],
  "Peljob|EB 150XR [OEM 230x96x33]": [
    "230x96x33"
  ],
  "Peljob|EB 150XT": [
    "230x96x33",
    "230x48x66"
  ],
  "Peljob|EB 150XTV": [
    "230x96x33",
    "230x48x66"
  ],
  "Peljob|EB 16": [
    "250x72x47"
  ],
  "Peljob|EB 16.4 (New)": [
    "250x72x47"
  ],
  "Peljob|EB 16.4 (Old)": [
    "250x72x45"
  ],
  "Peljob|EB 16.5": [
    "250x72x47"
  ],
  "Peljob|EB 22.4 (S/N < 16700)": [
    "320x100x38"
  ],
  "Peljob|EB 22.4 (S/N > 16699)": [
    "300x109x35"
  ],
  "Peljob|EB 246": [
    "230x72x43"
  ],
  "Peljob|EB 25.4": [
    "300x109x41"
  ],
  "Peljob|EB 250": [
    "300x109x41"
  ],
  "Peljob|EB 250XT": [
    "300x109x38",
    "300x52.5x78"
  ],
  "Peljob|EB 251": [
    "300x109x35",
    "300x52.5x72"
  ],
  "Peljob|EB 252": [
    "300x109x41",
    "300x52.5x84"
  ],
  "Peljob|EB 271 ('1998)": [
    "230x72x43"
  ],
  "Peljob|EB 28": [
    "300x109x41",
    "300x52.5x84"
  ],
  "Peljob|EB 28.4": [
    "300x109x41"
  ],
  "Peljob|EB 28.6": [
    "300x109x41",
    "300x52.5x84"
  ],
  "Peljob|EB 281": [
    "300x109x38",
    "300x52.5x78"
  ],
  "Peljob|EB 30.4": [
    "300x109x35",
    "300x52.5x72"
  ],
  "Peljob|EB 300": [
    "300x109x38",
    "300x52.5x78"
  ],
  "Peljob|EB 306": [
    "300x109x41",
    "300x52.5x84"
  ],
  "Peljob|EB 350": [
    "300x109x41",
    "300x52.5x84"
  ],
  "Peljob|EB 350XT": [
    "300x109x41",
    "300x52.5x84"
  ],
  "Peljob|EB 36 (new)": [
    "300x109x41"
  ],
  "Peljob|EB 36 (old)": [
    "320x100x43"
  ],
  "Peljob|EB 400": [
    "300x109x41",
    "300x52.5x84"
  ],
  "Peljob|EB 406": [
    "300x109x41",
    "300x52.5x84"
  ],
  "Peljob|EB 450": [
    "400x72.5x68"
  ],
  "Peljob|EB 506": [
    "400x146x35"
  ],
  "Peljob|EB 506 ('97)": [
    "400x72.5x72"
  ],
  "Peljob|LS 200": [
    "300x109x41",
    "300x52.5x84"
  ],
  "Peljob|LS 2000": [
    "300x109x41",
    "300x52.5x84"
  ],
  "Peljob|LS 286": [
    "300x109x41",
    "300x52.5x84"
  ],
  "Peljob|LS 386": [
    "300x109x41",
    "300x52.5x84"
  ],
  "Peljob|LS 406": [
    "300x109x41",
    "300x52.5x84"
  ],
  "Peljob|LS 502": [
    "400x146x35",
    "400x72.5x72"
  ],
  "Peljob|SIRIUS": [
    "230x72x43"
  ],
  "Peljob|SIRIUS plus": [
    "230x72x43"
  ],
  "Peljob|Tiga 68": [
    "400x73x72",
    "400x72.5x72"
  ],
  "Penta Moter|Jolly": [
    "230x72x42"
  ],
  "Penta Moter|Jolly 20B": [
    "200x72x42",
    "180x72x42"
  ],
  "Penta Moter|Jolly 26B": [
    "200x72x42",
    "180x72x42"
  ],
  "Penta Moter|Jolly 26PK": [
    "230x72x45"
  ],
  "Penta Moter|Maxi dumper": [
    "230x72x45"
  ],
  "Penta Moter|Maxi dumper 20PK": [
    "200x72x42"
  ],
  "Penta Moter|Robot": [
    "200x72x42"
  ],
  "Pezzolato|PZ 250": [
    "300x55x78",
    "300x52.5x80"
  ],
  "Picchio|1465 (Lifting platform)": [
    "180x72x34"
  ],
  "Picchio|1690 (Sky Lifter)": [
    "250x72x57"
  ],
  "Piccini|Dumper": [
    "230x72x43"
  ],
  "Piccini|mini 22": [
    "230x72x39"
  ],
  "Piccini|minicar 300": [
    "180x72x34"
  ],
  "Piccini|minicar 500": [
    "200x72x42"
  ],
  "Piccini|minicat 13": [
    "200x72x42"
  ],
  "Piccini|minicat 20": [
    "230x72x43"
  ],
  "Piccini|minicat 22": [
    "230x72x43"
  ],
  "Platform Basket|RQG 12 (Skylifter)": [
    "190x72x39",
    "180x72x39"
  ],
  "Platform Basket|RQG 12AD (Sky lifter)": [
    "200x72x37",
    "180x72x37"
  ],
  "Platform Basket|RQG 15.75 (Skylifter)": [
    "200x72x47"
  ],
  "Platform Basket|RQG 150AD (Sky lifter)": [
    "200x72x37",
    "180x72x37"
  ],
  "Platform Basket|RQG 18": [
    "250x72x52"
  ],
  "Platform Basket|RQG 18 (Sky lifter)": [
    "250x72x52"
  ],
  "Platform Basket|Spider 13.80 (Sky lifter)": [
    "200x72x47"
  ],
  "Platform Basket|Spider 18.90 (Sky lifter)": [
    "200x72x47"
  ],
  "Platform Basket|Spider 22.10 (Sky lifter)": [
    "200x72x47"
  ],
  "Platform Basket|Spider 27.14 (Sky lifter)": [
    "230x72x59"
  ],
  "Platform Basket|Spider 33.15 (Sky lifter)": [
    "250x72x64"
  ],
  "Platinum Lift|CF 125 (Rotary)": [
    "200x72x43"
  ],
  "Porello|Car 70 (transporter)": [
    "180x72x34"
  ],
  "Porrello|Car 100 (transporter)": [
    "230x72x42"
  ],
  "Porrello|Sky lifter": [
    "180x72x34"
  ],
  "Positrack|RCV 85": [
    "18x4x200",
    "457x101.6x50"
  ],
  "Powerfab|100 X": [
    "200x72x40"
  ],
  "Powerfab|1200 SX": [
    "200x72x40"
  ],
  "Powerfab|1200 X": [
    "200x72x35",
    "180x72x35"
  ],
  "Powerfab|1250": [
    "200x72x40"
  ],
  "Powerfab|1700 SX": [
    "200x72x40"
  ],
  "Powerfab|180": [
    "200x72x40"
  ],
  "Powerfab|HSS 11": [
    "200x72x40"
  ],
  "Powerfab|High type (Carrier)": [
    "200x72x40"
  ],
  "Powerfab|Samurai": [
    "230x72x42"
  ],
  "Powerpac|RC 350": [
    "180x60x38"
  ],
  "Powerpac|RC 500": [
    "180x60x38"
  ],
  "Pressoil|HR 15.1": [
    "230x72x43"
  ],
  "Putzmeister|SPM 300": [
    "300x109x43",
    "300x52.5x88"
  ],
  "QIYUN|GTJZ06": [
    "200x72x41"
  ],
  "RHINOCEROS|XN 12": [
    "180x72x37"
  ],
  "RHINOCEROS|XN 16": [
    "230x72x43"
  ],
  "RHINOCEROS|XN 18": [
    "230x72x43"
  ],
  "Rampicar|R 100": [
    "190x72x37",
    "180x72x37"
  ],
  "Rampicar|R 100AE": [
    "190x72x37",
    "180x72x37"
  ],
  "Rampicar|R 35": [
    "180x60x38"
  ],
  "Rampicar|R 50": [
    "180x60x38"
  ],
  "Rampicar|R 500 (Mini-carrier)": [
    "180x60x37"
  ],
  "Rampicar|R 60": [
    "180x60x38"
  ],
  "Rampicar|R 600": [
    "180x72x34"
  ],
  "Rampicar|R 600 (Mini-carrier)": [
    "180x72x34"
  ],
  "Rampicar|R 635": [
    "180x72x47",
    "200x72x47"
  ],
  "Rampicar|R 70": [
    "180x72x34"
  ],
  "Rampicar|R 70.1": [
    "180x72x39"
  ],
  "Rampicar|R 70AE": [
    "180x72x34"
  ],
  "Rampicar|R 800 (Mini-carrier)": [
    "180x72x34"
  ],
  "Rampicar|R 900 (Mini-carrier)": [
    "200x72x42"
  ],
  "Rampicar|Vignoble": [
    "180x72x34"
  ],
  "Ramrod|1150 Taskmaster": [
    "230x72x39"
  ],
  "Rayco|C 85L": [
    "400x73x68",
    "400x72.5x68"
  ],
  "Rayco|RG 35T": [
    "180x72x31"
  ],
  "Rayco|RG 37T": [
    "180x72x31"
  ],
  "Rayco|RG 40T": [
    "180x72x31"
  ],
  "Rayco|RG 45T-R": [
    "200x72x53"
  ],
  "Rayco|RG 55T": [
    "200x72x53"
  ],
  "Raymar|TRK 102": [
    "320x55x88",
    "300x52.5x92"
  ],
  "Raymar|TRK 120": [
    "400x72.5x74"
  ],
  "Raymar|TRK 120S": [
    "400x72.5x74"
  ],
  "Raymar|TRK 40": [
    "230x72x45"
  ],
  "Raymar|TRK 40LT": [
    "230x72x45"
  ],
  "Raymar|TRK 60": [
    "230x72x56"
  ],
  "Raymar|TRK 60S": [
    "230x72x56"
  ],
  "Renders|RME 170": [
    "230x72x43"
  ],
  "Riebsamen|Multi-pelle": [
    "180x72x37"
  ],
  "Rock|20": [
    "230x72x43"
  ],
  "Rocky Rapid|BFR 402": [
    "180x60x34"
  ],
  "Rolatec|ML 76A (Drilling machine)": [
    "180x72x34"
  ],
  "Rossi|R 103.3": [
    "230x72x43"
  ],
  "Rossi|R 105.3": [
    "230x72x43"
  ],
  "Rotomax|Drilling machine": [
    "250x72x52"
  ],
  "Rufener|RK 1200 (mini-dumper)": [
    "230x72x45"
  ],
  "Rufener|RK 1500 (mini-dumper)": [
    "250x72x48"
  ],
  "Rufener|RK 500 (mini-dumper)": [
    "180x72x34"
  ],
  "Rufener|RK 602 (mini-dumper)": [
    "190x72x34",
    "180x72x34"
  ],
  "Rufener|RK 700 (mini-dumper)": [
    "190x72x37",
    "180x72x37"
  ],
  "Rufener|RK 900 (mini-dumper)": [
    "190x72x39",
    "180x72x39"
  ],
  "SDP Manufacturing|2500": [
    "230x72x56"
  ],
  "SDP Manufacturing|EZ Hauler55M": [
    "300x52.5x92",
    "300x52.5x92"
  ],
  "SMC|MX 08XT": [
    "180x72x38"
  ],
  "SMC|MX 14-1": [
    "230x72x43"
  ],
  "SMC|MX 15": [
    "230x96x33",
    "230x48x66"
  ],
  "SMC|MX 16XT": [
    "230x96x33",
    "230x48x66"
  ],
  "SMC|MX 30": [
    "300x52.5x74",
    "300x52.5x74"
  ],
  "SMC|MX 35": [
    "300x54x82",
    "300x52.5x84"
  ],
  "SMC|MX 50": [
    "400x72.5x72"
  ],
  "SMC|MX 80": [
    "450x71x86"
  ],
  "SUP|Elefant S19": [
    "230x72x52"
  ],
  "Sacet|KC 28 ALV": [
    "250x72x57"
  ],
  "Samsung|MX 030": [
    "300x101.6x40",
    "300x52.5x78"
  ],
  "Samsung|SE 50": [
    "400x73x74",
    "400x72.5x74"
  ],
  "Samsung|SE 50-3": [
    "400x72.5x74"
  ],
  "Sandqueen Uk|Dumper": [
    "230x72x42"
  ],
  "Sany|SY16C": [
    "230x48x70"
  ],
  "Sany|SY26C": [
    "300x52.5x80",
    "300x52.5x80"
  ],
  "Sany|SY26U": [
    "300x52.5x80",
    "300x52.5x80"
  ],
  "Sany|SY35U": [
    "300x55x84",
    "300x52.5x88"
  ],
  "Sany|SY50U": [
    "400x72.5x74"
  ],
  "Sany|SY75C": [
    "450x81.5x76",
    "450x81x76"
  ],
  "Sany|SY80U": [
    "450x81.5x78",
    "450x81x78"
  ],
  "Sato|SC 1200": [
    "180x72x37"
  ],
  "Sato|SC 156DD (Mini-carrier)": [
    "180x60x34"
  ],
  "Sato|SC 156DS (Mini-carrier)": [
    "180x60x34"
  ],
  "Sato|SC 433 (Mini-carrier)": [
    "200x72x35",
    "180x72x35"
  ],
  "Sato|SC 433DA (Mini-carrier)": [
    "200x72x35",
    "180x72x35"
  ],
  "Sato|SC 433DH (Mini-carrier)": [
    "200x72x35",
    "180x72x35"
  ],
  "Sato|SC 433LDA (Mini-carrier)": [
    "200x72x35",
    "180x72x35"
  ],
  "Sato|SC 433LDS (Mini-carrier)": [
    "200x72x35",
    "180x72x35"
  ],
  "Sato|SCL 476A (Mini-carrier)": [
    "200x72x35",
    "180x72x35"
  ],
  "Satvia|VB 101R": [
    "250x72x48"
  ],
  "Satvia|VT 102R": [
    "250x72x52"
  ],
  "Satvia|VT 150R": [
    "300x55x82",
    "300x52.5x84"
  ],
  "Scattrack|116": [
    "230x72x45"
  ],
  "Scattrack|118": [
    "230x72x45"
  ],
  "Scattrack|125": [
    "300x109x36",
    "300x52.5x74"
  ],
  "Scattrack|130": [
    "300x55x78",
    "300x52.5x80"
  ],
  "Scattrack|135": [
    "300x55x78",
    "300x52.5x80"
  ],
  "Scattrack|150": [
    "400x73x72",
    "400x72.5x72"
  ],
  "Scattrack|254S": [
    "400x73x72",
    "400x72.5x72"
  ],
  "Scattrack|516": [
    "230x72x45"
  ],
  "Scattrack|520": [
    "230x72x45"
  ],
  "Scattrack|520V": [
    "230x72x45"
  ],
  "Scattrack|530": [
    "300x109x36",
    "300x52.5x74"
  ],
  "Scattrack|533": [
    "300x109x39",
    "300x52.5x80"
  ],
  "Scattrack|535": [
    "300x109x39",
    "300x52.5x80"
  ],
  "Scattrack|545": [
    "400x72.5x72"
  ],
  "Schaefer|DS 1200 (Mini-dumper)": [
    "180x72x37"
  ],
  "Schaeff|H 15": [
    "230x96x33",
    "230x48x66"
  ],
  "Schaeff|H 24": [
    "300x109x36",
    "300x52.5x74"
  ],
  "Schaeff|H 27": [
    "300x109x36",
    "300x52.5x74"
  ],
  "Schaeff|HR 02": [
    "230x96x33",
    "230x48x66",
    "230x72x43",
    "250x72x45"
  ],
  "Schaeff|HR 1": [
    "180x72x36"
  ],
  "Schaeff|HR 1.5": [
    "230x48x66",
    "230x96x33"
  ],
  "Schaeff|HR 1.6": [
    "230x48x66",
    "230x96x33"
  ],
  "Schaeff|HR 11": [
    "230x96x33",
    "230x48x66"
  ],
  "Schaeff|HR 12 (New)": [
    "230x96x33"
  ],
  "Schaeff|HR 12 (old)": [
    "230x96x31"
  ],
  "Schaeff|HR 13 ('2001)": [
    "230x96x33",
    "230x48x66"
  ],
  "Schaeff|HR 14": [
    "300x52.5x74",
    "300x52.5x74"
  ],
  "Schaeff|HR 14 (< '1995)": [
    "300x109x36",
    "300x52.5x74"
  ],
  "Schaeff|HR 14 (> '1995)": [
    "300x55x72",
    "300x52.5x74"
  ],
  "Schaeff|HR 16 (< '1995)": [
    "300x109x39",
    "300x52.5x80"
  ],
  "Schaeff|HR 16 (> '1995)": [
    "300x55x78",
    "300x52.5x80"
  ],
  "Schaeff|HR 18": [
    "400x72.5x72"
  ],
  "Schaeff|HR 2 (New)": [
    "230x96x33",
    "230x48x66"
  ],
  "Schaeff|HR 2 (old)": [
    "250x72x45"
  ],
  "Schaeff|HR 2.0": [
    "230x48x66",
    "230x96x33"
  ],
  "Schaeff|HR 20": [
    "400x72.5x72",
    "400x72.5x76"
  ],
  "Schaeff|HR 21": [
    "400x72.5x76"
  ],
  "Schaeff|HR 22": [
    "400x72.5x76"
  ],
  "Schaeff|HR 24": [
    "300x109x36",
    "300x52.5x74"
  ],
  "Schaeff|HR 27": [
    "300x109x36",
    "300x52.5x74"
  ],
  "Schaeff|HR 3.7 (new)": [
    "300x52.5x86",
    "300x52.5x86"
  ],
  "Schaeff|HR 3.7 (old)": [
    "300x52.5x92",
    "300x52.5x92"
  ],
  "Schaeff|HR 31": [
    "450x81x76",
    "450x81x76"
  ],
  "Schaeff|HR 32": [
    "450x71x86"
  ],
  "Schaeff|HR 32CI": [
    "450x71x86"
  ],
  "Schaeff|HR 4-A": [
    "320x109x36",
    "300x52.5x74"
  ],
  "Schaeff|HR 42": [
    "500x92x78"
  ],
  "Schaeff|HR 8 (New)": [
    "300x109x39",
    "300x52.5x80"
  ],
  "Schaeff|HR 8-A": [
    "300x109x39",
    "300x52.5x80"
  ],
  "Schaeff|N 120": [
    "230x72x47"
  ],
  "Schaeff|TC08": [
    "180x72x37"
  ],
  "Schaeff|TC10Z": [
    "180x72x43"
  ],
  "Sedidrill|110 (drilling machine)": [
    "200x72x37",
    "180x72x37"
  ],
  "Sedidrill|210 (drilling machine)": [
    "250x72x52"
  ],
  "Sedidrill|250 (drilling machine)": [
    "230x72x43"
  ],
  "Sedidrill|90 (drilling machine)": [
    "180x72x37"
  ],
  "Senic|TSJ 34": [
    "320x100x52"
  ],
  "Senic|TZ 170": [
    "250x72x52"
  ],
  "Sequani|135CS Skylift": [
    "180x72x37"
  ],
  "Shibura|425MA": [
    "200x72x35",
    "180x72x35"
  ],
  "Shin-Towa|CC 104": [
    "200x72x43"
  ],
  "Shin-Towa|CC 154": [
    "200x72x40"
  ],
  "Shin-Towa|CC 204": [
    "200x72x43"
  ],
  "Shin-Towa|CC 205": [
    "200x72x43"
  ],
  "Shin-Towa|CC 235": [
    "200x72x40"
  ],
  "Shin-Towa|CC 265": [
    "200x72x43"
  ],
  "Shin-Towa|CC 266": [
    "200x72x43"
  ],
  "Shin-Towa|CC 285": [
    "200x72x43"
  ],
  "Shin-Towa|CL 100": [
    "200x72x36",
    "180x72x36"
  ],
  "Shin-Towa|NC 180": [
    "180x72x39"
  ],
  "Shin-Towa|TC 204": [
    "200x72x43"
  ],
  "Showa Aircraft|SWP 030VCB": [
    "180x72x37"
  ],
  "Sicocu|750DH3": [
    "200x72x38",
    "180x72x38"
  ],
  "Sika|ALIVA 503": [
    "250x72x47"
  ],
  "Silea|45RP": [
    "230x72x43"
  ],
  "Silla|14": [
    "230x72x43"
  ],
  "Silla|18": [
    "240x72x48",
    "230x72x48",
    "250x72x48"
  ],
  "Silla|ME 1400H": [
    "230x72x45"
  ],
  "Slane|HT1000": [
    "180x72x40"
  ],
  "Slane International|Big Dog SL 900": [
    "200x72x43"
  ],
  "Slane International|Big Skip HT750 (Mini-carrier)": [
    "180x72x34"
  ],
  "Smac|CC 91 (Aerial work platform)": [
    "300x55x80",
    "300x52.5x82"
  ],
  "Smac|PC 40III (Lifting platform)": [
    "200x72x42"
  ],
  "So.Ca.Ce|Europlanet 190 C 080 SC (Crane)": [
    "250x72x52"
  ],
  "Socomafor|35R": [
    "230x72x52"
  ],
  "Socomafor|50R": [
    "250x72x52"
  ],
  "Socomafor|65 (drilling)": [
    "400x72.5x74"
  ],
  "Soma|SB 15K": [
    "230x72x43"
  ],
  "Soma|SB 28": [
    "300x55x76",
    "300x52.5x78"
  ],
  "Stanley|TRACKhorse": [
    "180x72x40"
  ],
  "Stenuick|FORTRACK 200H": [
    "230x72x43"
  ],
  "Stenuick|S 320": [
    "230x72x52"
  ],
  "Straightline|2062": [
    "320x100x52"
  ],
  "Streck|SF / U (Carrier)": [
    "230x72x59"
  ],
  "Sumitomo|LS 1000FXJ2": [
    "300x52.5x84"
  ],
  "Sumitomo|LS 1000FXJ3": [
    "300x52.5x84"
  ],
  "Sumitomo|LS 1200FXJ2": [
    "400x72.5x70",
    "400x72.5x70"
  ],
  "Sumitomo|LS 1200FXJ3": [
    "400x72.5x70",
    "400x72.5x70"
  ],
  "Sumitomo|LS 1300FXJ2": [
    "400x73x74",
    "400x72.5x74"
  ],
  "Sumitomo|LS 1300FXJ3": [
    "400x73x74",
    "400x72.5x74"
  ],
  "Sumitomo|LS 1350UXJ": [
    "400x73x74",
    "400x72.5x74"
  ],
  "Sumitomo|LS 160": [
    "450x73.5x80",
    "450x71x82"
  ],
  "Sumitomo|LS 300FXJ": [
    "180x72x37"
  ],
  "Sumitomo|LS 500FXJ": [
    "230x72x43"
  ],
  "Sumitomo|LS 600FXJ": [
    "230x72x43"
  ],
  "Sumitomo|LS 600FXJ3": [
    "230x72x43"
  ],
  "Sumitomo|LS 600PXJ3": [
    "230x72x43"
  ],
  "Sumitomo|LS 700FXJ2": [
    "300x52.5x72"
  ],
  "Sumitomo|LS 700FXJ3": [
    "300x52.5x72"
  ],
  "Sumitomo|LS 800FXJ2": [
    "300x52.5x76"
  ],
  "Sumitomo|LS 800FXJ3": [
    "300x52.5x76"
  ],
  "Sumitomo|LS 850UXJ": [
    "300x52.5x80"
  ],
  "Sumitomo|LS 850UXJ2": [
    "300x52.5x80"
  ],
  "Sumitomo|LS 900FXJ2": [
    "300x52.5x80"
  ],
  "Sumitomo|LS 900FXJ3": [
    "300x52.5x80"
  ],
  "Sumitomo|S 100": [
    "300x109x41",
    "300x52.5x84"
  ],
  "Sumitomo|S 100F2": [
    "300x109x41",
    "300x52.5x84"
  ],
  "Sumitomo|S 100FJ3": [
    "300x109x41",
    "300x52.5x84"
  ],
  "Sumitomo|S 120": [
    "400x142x36",
    "400x72.5x70"
  ],
  "Sumitomo|S 120F2": [
    "400x142x36",
    "400x72.5x70"
  ],
  "Sumitomo|S 130": [
    "400x142x38",
    "400x72.5x74"
  ],
  "Sumitomo|S 130F2": [
    "400x142x38",
    "400x72.5x74"
  ],
  "Sumitomo|S 160B": [
    "450x73.5x80",
    "450x71x82"
  ],
  "Sumitomo|S 160B2": [
    "450x73.5x80",
    "450x71x82"
  ],
  "Sumitomo|S 160FJ2": [
    "450x73.5x80",
    "450x71x82"
  ],
  "Sumitomo|S 30FX": [
    "180x72x37"
  ],
  "Sumitomo|S 30UX-1": [
    "200x72x41"
  ],
  "Sumitomo|S 50F2": [
    "230x72x43"
  ],
  "Sumitomo|S 50K": [
    "230x72x43"
  ],
  "Sumitomo|S 60F2": [
    "230x72x43"
  ],
  "Sumitomo|S 70FX2": [
    "300x52.5x72"
  ],
  "Sumitomo|S 80F2": [
    "300x109x36",
    "300x52.5x74"
  ],
  "Sumitomo|S 80FX2": [
    "300x109x36",
    "300x52.5x74"
  ],
  "Sumitomo|S 90": [
    "300x109x39",
    "300x52.5x80"
  ],
  "Sumitomo|S 90F2": [
    "300x109x39",
    "300x52.5x80"
  ],
  "Sumitomo|S 90FX3": [
    "300x109x39",
    "300x52.5x80"
  ],
  "Sumitomo|S 90FXJ3": [
    "300x109x39",
    "300x52.5x80"
  ],
  "Sumitomo|SH 10UJ3": [
    "200x72x47"
  ],
  "Sumitomo|SH 12JX": [
    "230x72x47"
  ],
  "Sumitomo|SH 135-2": [
    "500x92x84"
  ],
  "Sumitomo|SH 145": [
    "500x92x84"
  ],
  "Sumitomo|SH 15J": [
    "230x96x32",
    "230x48x64"
  ],
  "Sumitomo|SH 18J": [
    "230x96x35",
    "230x48x70"
  ],
  "Sumitomo|SH 18UJ": [
    "250x96x40",
    "250x48x80"
  ],
  "Sumitomo|SH 18UJ2": [
    "250x96x40",
    "250x48x80"
  ],
  "Sumitomo|SH 20JX": [
    "250x96x40",
    "250x48x80"
  ],
  "Sumitomo|SH 25J": [
    "300x52.5x72"
  ],
  "Sumitomo|SH 25JX": [
    "300x52.5x76"
  ],
  "Sumitomo|SH 28J": [
    "300x52.5x76"
  ],
  "Sumitomo|SH 30J": [
    "300x52.5x80"
  ],
  "Sumitomo|SH 30JX": [
    "300x52.5x84"
  ],
  "Sumitomo|SH 30JX2": [
    "300x52.5x84"
  ],
  "Sumitomo|SH 30U": [
    "300x52.5x80"
  ],
  "Sumitomo|SH 30UJ": [
    "300x52.5x80"
  ],
  "Sumitomo|SH 30UJ2": [
    "300x52.5x80"
  ],
  "Sumitomo|SH 30UJ3": [
    "300x52.5x80"
  ],
  "Sumitomo|SH 32J": [
    "300x52.5x84"
  ],
  "Sumitomo|SH 35J": [
    "300x52.5x84"
  ],
  "Sumitomo|SH 35JX": [
    "300x52.5x90"
  ],
  "Sumitomo|SH 35JX2": [
    "300x52.5x90"
  ],
  "Sumitomo|SH 35UJ": [
    "300x52.5x90"
  ],
  "Sumitomo|SH 38UJ": [
    "300x52.5x90"
  ],
  "Sumitomo|SH 38UJ2": [
    "300x52.5x90"
  ],
  "Sumitomo|SH 40JX": [
    "400x72.5x72"
  ],
  "Sumitomo|SH 40JX2": [
    "400x72.5x72"
  ],
  "Sumitomo|SH 40UJ2": [
    "300x52.5x90"
  ],
  "Sumitomo|SH 45J": [
    "400x73x72",
    "400x72.5x72"
  ],
  "Sumitomo|SH 45J2": [
    "400x73x72",
    "400x72.5x72"
  ],
  "Sumitomo|SH 45JX": [
    "400x72.5x72"
  ],
  "Sumitomo|SH 45UJ": [
    "400x73x72",
    "400x72.5x72"
  ],
  "Sumitomo|SH 55J": [
    "400x73x74",
    "400x72.5x74"
  ],
  "Sumitomo|SH 55U-2": [
    "400x73x72",
    "400x72.5x72"
  ],
  "Sumitomo|SH 55UJ": [
    "400x73x74",
    "400x72.5x74"
  ],
  "Sumitomo|SH 60": [
    "450x73.5x80",
    "450x71x82"
  ],
  "Sumitomo|SH 60-2": [
    "450x73.5x80",
    "450x71x82"
  ],
  "Sumitomo|SH 65U": [
    "450x71x82"
  ],
  "Sumitomo|SH 65U-1": [
    "450x71x82"
  ],
  "Sumitomo|SH 65UJ": [
    "450x71x82"
  ],
  "Sumitomo|SH 7GX3": [
    "180x72x37"
  ],
  "Sumitomo|SH 7J": [
    "180x72x37"
  ],
  "Sumitomo|SH 9UX": [
    "200x72x41"
  ],
  "Sumitomo|SH 9UX2": [
    "200x72x47"
  ],
  "Sumitomo|SH 9UX3": [
    "200x72x47"
  ],
  "Sunward|SWE 08": [
    "180x72x37"
  ],
  "Sunward|SWE 08B": [
    "180x72x39"
  ],
  "Sunward|SWE 15": [
    "230x48x68"
  ],
  "Sunward|SWE 15S": [
    "230x48x68"
  ],
  "Sunward|SWE 17": [
    "230x48x68"
  ],
  "Sunward|SWE 17S": [
    "230x48x68"
  ],
  "Sunward|SWE 18UB": [
    "230x48x70"
  ],
  "Sunward|SWE 18UF": [
    "230x48x70"
  ],
  "Sunward|SWE 25B": [
    "250x52.5x76",
    "300x52.5x76"
  ],
  "Sunward|SWE 25UF": [
    "300x55x78",
    "300x52.5x80"
  ],
  "Sunward|SWE 28": [
    "300x55x78",
    "300x52.5x80"
  ],
  "Sunward|SWE 35UF": [
    "300x55x84",
    "300x52.5x88"
  ],
  "Sunward|SWE 38": [
    "300x55x84",
    "300x52.5x88"
  ],
  "Sunward|SWE 40U": [
    "300x55x84",
    "300x52.5x88"
  ],
  "Sunward|SWE 50B": [
    "400x72.5x72",
    "400x72.5x72"
  ],
  "Sunward|SWE 55": [
    "400x72.5x72",
    "400x72.5x72"
  ],
  "Sunward|SWE 60": [
    "400x72.5x74"
  ],
  "Sunward|SWE 60B": [
    "400x72.5x74"
  ],
  "Sunward|SWE 60UF": [
    "400x72.5x74"
  ],
  "Sunward|SWE 70": [
    "400x72.5x82"
  ],
  "Sunward|SWE 70B": [
    "400x72.5x82"
  ],
  "Sunward|SWE 78": [
    "450x76x80"
  ],
  "Sunward|SWE 80": [
    "450x76x80"
  ],
  "Sunward|SWE 90": [
    "450x76x82"
  ],
  "Sunward|SWTL 4210 (Compact Track Loader)": [
    "450x84x57",
    "450x86x56"
  ],
  "Sunward|SWTL 4518 (Compact Track Loader)": [
    "450x84x57",
    "450x86x56"
  ],
  "Supertoy|800T": [
    "180x72x38"
  ],
  "TAIANLUYUE|Y125": [
    "320x86x52"
  ],
  "TCP|Hi-T500 (Mini-carrier)": [
    "180x72x31"
  ],
  "TCP|TCP 500 (Carrier ) Uk market": [
    "180x60x37"
  ],
  "TECOINSA|TP50D": [
    "300x52.5x84"
  ],
  "TES|29": [
    "200x72x37",
    "180x72x37"
  ],
  "TRACCESS|230": [
    "250x72x52"
  ],
  "TRS|CM 500": [
    "180x60x38"
  ],
  "TZ|C20": [
    "230x72x43"
  ],
  "Tadano|AC 40": [
    "180x72x39"
  ],
  "Tadano|AC 45SG (Lifter platform)": [
    "200x72x42"
  ],
  "Takeuchi|Huppi 403": [
    "180x72x34"
  ],
  "Takeuchi|J-4": [
    "250x48x82",
    "250x47x84"
  ],
  "Takeuchi|S 2430LC": [
    "200x72x35"
  ],
  "Takeuchi|TAK 700 (mini-dumper)": [
    "180x72x31"
  ],
  "Takeuchi|TB 007": [
    "180x72x37"
  ],
  "Takeuchi|TB 008": [
    "200x72x39"
  ],
  "Takeuchi|TB 014": [
    "230x48x62"
  ],
  "Takeuchi|TB 014A/LSA": [
    "230x48x62"
  ],
  "Takeuchi|TB 014S/LSA": [
    "230x48x62"
  ],
  "Takeuchi|TB 015": [
    "230x96x31",
    "230x48x62"
  ],
  "Takeuchi|TB 015A": [
    "230x96x31",
    "230x48x62"
  ],
  "Takeuchi|TB 016": [
    "230x48x68"
  ],
  "Takeuchi|TB 016S/LSA": [
    "230x48x68"
  ],
  "Takeuchi|TB 025": [
    "260x52.5x72",
    "300x52.5x72"
  ],
  "Takeuchi|TB 030": [
    "300x52.5x78",
    "300x55x75"
  ],
  "Takeuchi|TB 030UR": [
    "300x109x40",
    "300x52.5x82"
  ],
  "Takeuchi|TB 035": [
    "300x52.5x82",
    "300x52.5x82"
  ],
  "Takeuchi|TB 045": [
    "350x52.5x86"
  ],
  "Takeuchi|TB 07": [
    "400x72.5x74",
    "400x72.5x74"
  ],
  "Takeuchi|TB 070": [
    "180x72x37"
  ],
  "Takeuchi|TB 08": [
    "450x81x76",
    "450x81x76"
  ],
  "Takeuchi|TB 080": [
    "200x72x39"
  ],
  "Takeuchi|TB 105": [
    "200x72x39"
  ],
  "Takeuchi|TB 106": [
    "230x72x43"
  ],
  "Takeuchi|TB 108": [
    "180x72x37"
  ],
  "Takeuchi|TB 10F": [
    "230x72x43"
  ],
  "Takeuchi|TB 10S": [
    "230x72x43"
  ],
  "Takeuchi|TB 1135": [
    "500x92x84"
  ],
  "Takeuchi|TB 1140": [
    "500x92x84"
  ],
  "Takeuchi|TB 1150": [
    "500x92x84"
  ],
  "Takeuchi|TB 12": [
    "230x72x43"
  ],
  "Takeuchi|TB 120": [
    "230x72x43"
  ],
  "Takeuchi|TB 120R": [
    "230x72x43"
  ],
  "Takeuchi|TB 125": [
    "300x52.5x78"
  ],
  "Takeuchi|TB 125LSA": [
    "300x52.5x78"
  ],
  "Takeuchi|TB 128": [
    "300x52.5x82"
  ],
  "Takeuchi|TB 135": [
    "300x52.5x86"
  ],
  "Takeuchi|TB 135LSA": [
    "300x52.5x86"
  ],
  "Takeuchi|TB 138FR": [
    "300x52.5x86"
  ],
  "Takeuchi|TB 14": [
    "230x72x43"
  ],
  "Takeuchi|TB 145": [
    "400x72.5x74",
    "400x72.5x73",
    "400x72.5x74"
  ],
  "Takeuchi|TB 15 (New)": [
    "230x96x31",
    "230x48x62"
  ],
  "Takeuchi|TB 15 (old)": [
    "230x72x43"
  ],
  "Takeuchi|TB 153FR": [
    "400x72.5x74",
    "400x72.5x73",
    "400x72.5x74"
  ],
  "Takeuchi|TB 15F": [
    "230x96x35",
    "230x48x70"
  ],
  "Takeuchi|TB 15FR": [
    "230x48x70"
  ],
  "Takeuchi|TB 16": [
    "230x72x43"
  ],
  "Takeuchi|TB 175": [
    "450x81x76",
    "450x81x76"
  ],
  "Takeuchi|TB 175LSA": [
    "450x81x76",
    "450x81x76"
  ],
  "Takeuchi|TB 180FR": [
    "450x81x76",
    "450x81x76"
  ],
  "Takeuchi|TB 20R": [
    "250x48x82",
    "250x47x84"
  ],
  "Takeuchi|TB 210R": [
    "180x72x40"
  ],
  "Takeuchi|TB 2150": [
    "500x92x84"
  ],
  "Takeuchi|TB 2150R": [
    "500x92x88"
  ],
  "Takeuchi|TB 215R": [
    "230x48x68"
  ],
  "Takeuchi|TB 216": [
    "230x48x68"
  ],
  "Takeuchi|TB 217R [OEM 230x48x68]": [
    "230x48x68",
    "230x48x70"
  ],
  "Takeuchi|TB 225": [
    "250x48x80"
  ],
  "Takeuchi|TB 228": [
    "300x52.5x78"
  ],
  "Takeuchi|TB 230": [
    "300x52.5x78"
  ],
  "Takeuchi|TB 235": [
    "350x52.5x86"
  ],
  "Takeuchi|TB 23R": [
    "250x48x82",
    "250x47x84"
  ],
  "Takeuchi|TB 240": [
    "350x52.5x86"
  ],
  "Takeuchi|TB 250 [OEM 320x100x43]": [
    "320x100x43",
    "400x72.5x74"
  ],
  "Takeuchi|TB 250-2": [
    "400x72.5x74"
  ],
  "Takeuchi|TB 250A": [
    "400x72.5x74",
    "400x72.5x73",
    "400x72.5x74"
  ],
  "Takeuchi|TB 257FR": [
    "400x72.5x74"
  ],
  "Takeuchi|TB 25FR": [
    "300x52.5x78"
  ],
  "Takeuchi|TB 260": [
    "400x72.5x76"
  ],
  "Takeuchi|TB 280FR": [
    "450x81x76",
    "450x81x76"
  ],
  "Takeuchi|TB 285": [
    "450x81x76",
    "450x81x76"
  ],
  "Takeuchi|TB 28FR": [
    "300x52.5x82"
  ],
  "Takeuchi|TB 290": [
    "450x81x76",
    "450x81x76"
  ],
  "Takeuchi|TB 30UR": [
    "300x109x40",
    "300x52.5x82"
  ],
  "Takeuchi|TB 38FR": [
    "350x52.5x86"
  ],
  "Takeuchi|TB 53FR": [
    "400x72.5x74",
    "400x72.5x73",
    "400x72.5x74"
  ],
  "Takeuchi|TB 55R": [
    "400x73x72",
    "400x72.5x72"
  ],
  "Takeuchi|TB 55UR": [
    "400x72.5x72"
  ],
  "Takeuchi|TB 650": [
    "230x72x43"
  ],
  "Takeuchi|TB 650S": [
    "230x72x43"
  ],
  "Takeuchi|TB 80FR": [
    "450x81x76",
    "450x81x76"
  ],
  "Takeuchi|TB 980": [
    "230x96x31",
    "230x48x62"
  ],
  "Takeuchi|TC 425LD": [
    "200x72x35",
    "180x72x35"
  ],
  "Takeuchi|TC 850": [
    "200x72x40"
  ],
  "Takeuchi|TC 850S": [
    "200x72x40"
  ],
  "Takeuchi|TCF 850": [
    "200x72x40"
  ],
  "Takeuchi|TCF 850S": [
    "200x72x42"
  ],
  "Takeuchi|TL 10 (Compact Track Loader)": [
    "450x100x48"
  ],
  "Takeuchi|TL 10V2 (Compact Track Loader)": [
    "400x86x52"
  ],
  "Takeuchi|TL 12 (Compact Track Loader)": [
    "450x100x50"
  ],
  "Takeuchi|TL 120 (Compact Track Loader)": [
    "320x86x46"
  ],
  "Takeuchi|TL 12R2 (Compact Track Loader)": [
    "450x86x60",
    "450x8x60"
  ],
  "Takeuchi|TL 12V2 (Compact Track Loader)": [
    "450x86x60",
    "450x8x60"
  ],
  "Takeuchi|TL 130 (Compact Track Loader)": [
    "320x86x52"
  ],
  "Takeuchi|TL 140 (Compact Track Loader)": [
    "450x100x48"
  ],
  "Takeuchi|TL 150 (Compact Track Loader)": [
    "450x100x50"
  ],
  "Takeuchi|TL 220 (Compact Track Loader)": [
    "320x86x46"
  ],
  "Takeuchi|TL 230 (Compact Track Loader)": [
    "320x86x52"
  ],
  "Takeuchi|TL 230-2 (Compact Track Loader)": [
    "320x86x52"
  ],
  "Takeuchi|TL 240 (Compact Track Loader)": [
    "450x100x48"
  ],
  "Takeuchi|TL 250 (Compact Track Loader)": [
    "450x100x50"
  ],
  "Takeuchi|TL 6R (Compact Track Loader)": [
    "320x86x50"
  ],
  "Takeuchi|TL 8 (Compact Track Loader)": [
    "400x86x52",
    "320x86x52"
  ],
  "Takeuchi|TL 8R-2 (Compact Track Loader)": [
    "400x86x52"
  ],
  "Takeuchi|TZ 10": [
    "230x72x43"
  ],
  "Tanaka|DC 153 (mini-carrier)": [
    "200x72x37",
    "180x72x37"
  ],
  "Taylorst. Plant|Hi C40 (TRACKed Crusher) Uk market": [
    "180x72x31"
  ],
  "Taylorst. Plant|Hi T500 (Carrier) Uk market": [
    "180x72x31"
  ],
  "Taylorst. Plant|TCP 500 (Carrier ) Uk market": [
    "180x60x37"
  ],
  "Tecniwell|TWH 5": [
    "180x72x36"
  ],
  "Tekna|K 14": [
    "230x72x43"
  ],
  "Tekna|K 14M": [
    "230x72x43"
  ],
  "Tekna|K 14S": [
    "230x72x43"
  ],
  "Tekna|K 15": [
    "230x96x33",
    "230x72x43",
    "230x48x66"
  ],
  "Tekna|K 28S": [
    "300x55x74",
    "300x52.5x76"
  ],
  "Tekna|K 35S": [
    "300x55x78",
    "300x52.5x80"
  ],
  "Tekna|T 13": [
    "180x72x37"
  ],
  "Tekna|TC 9": [
    "180x72x34"
  ],
  "Terex|AM 29R": [
    "300x55x72",
    "300x52.5x74"
  ],
  "Terex|AM 35R": [
    "300x52.5x80",
    "300x52.5x80"
  ],
  "Terex|AM 37R": [
    "300x52.5x86",
    "300x52.5x86"
  ],
  "Terex|AR 35": [
    "300x55x78",
    "300x52.5x80"
  ],
  "Terex|HR 14 (< '1995)": [
    "300x109x36",
    "300x52.5x74"
  ],
  "Terex|HR 14 (> '1995)": [
    "300x55x72",
    "300x52.5x74"
  ],
  "Terex|HR 16 (< '1995)": [
    "300x109x39",
    "300x52.5x80"
  ],
  "Terex|HR 16 (> '1995)": [
    "300x55x78",
    "300x52.5x80"
  ],
  "Terex|PT-100": [
    "18x4x200",
    "457x101.6x50"
  ],
  "Terex|PT-100F": [
    "18x4x200",
    "457x101.6x50"
  ],
  "Terex|PT-100G": [
    "18x4x201",
    "457x101.6x51"
  ],
  "Terex|PT-110": [
    "18x4x201",
    "457x101.6x51"
  ],
  "Terex|PT-110G": [
    "18x4x201",
    "457x101.6x51"
  ],
  "Terex|PT-50": [
    "15x4x166",
    "381x101.6x42"
  ],
  "Terex|PT-60": [
    "15x4x166",
    "381x101.6x42"
  ],
  "Terex|PT-75": [
    "18x4x201",
    "457x101.6x51"
  ],
  "Terex|PT-80": [
    "18x4x201",
    "457x101.6x51"
  ],
  "Terex|R160T": [
    "15x4x166",
    "381x101.6x42"
  ],
  "Terex|R190T": [
    "15x4x166",
    "381x101.6x42"
  ],
  "Terex|R350T": [
    "18x4x201",
    "457x101.6x51"
  ],
  "Terex|TC 125": [
    "500x92x78"
  ],
  "Terex|TC 15": [
    "230x48x66",
    "230x96x33"
  ],
  "Terex|TC 16": [
    "230x48x66",
    "230x96x33"
  ],
  "Terex|TC 19": [
    "230x48x70"
  ],
  "Terex|TC 20": [
    "230x48x66",
    "230x96x33"
  ],
  "Terex|TC 25": [
    "300x52.5x80",
    "300x52.5x80"
  ],
  "Terex|TC 29": [
    "300x55x72",
    "300x52.5x74"
  ],
  "Terex|TC 35": [
    "300x55x78",
    "300x52.5x80"
  ],
  "Terex|TC 37": [
    "300x52.5x86",
    "300x52.5x86"
  ],
  "Terex|TC 48": [
    "400x72.5x72"
  ],
  "Terex|TC 50": [
    "400x72.5x72"
  ],
  "Terex|TC 60": [
    "400x72.5x76"
  ],
  "Terex|TC 75": [
    "450x71x86"
  ],
  "Terra Jet|2514 B (drilling machine)": [
    "230x72x43"
  ],
  "Terra Jet|CITY JET (drilling machine)": [
    "230x72x43"
  ],
  "Terra Jet|TERRA JET (drilling machine)": [
    "230x72x43"
  ],
  "Terramac|RT9": [
    "700x100x98"
  ],
  "Terramite|TX 15": [
    "230x96x32",
    "230x48x64"
  ],
  "Terramite|TX 25": [
    "300x52.5x72"
  ],
  "Tescar|TES 20 (drilling machine)": [
    "200x72x37",
    "180x72x37"
  ],
  "Thomas|175 (VTS System for Skidsteer Loader)": [
    "320x86x52",
    "375x86x52",
    "400x86x52"
  ],
  "Thomas|225 TURBO (VTS System for Skidsteer Loader)": [
    "450x86x56"
  ],
  "Thomas|245 TURBO (VTS System for Skidsteer Loader)": [
    "450x86x56"
  ],
  "Thomas|25G (Skid steer loader)": [
    "230x72x39"
  ],
  "Thomas|25GT (Skid steer loader)": [
    "230x72x39"
  ],
  "Thomas|35DT (Skid steer loader)": [
    "230x72x39"
  ],
  "Thomas|MS 25G (Skid steer loader)": [
    "230x72x39"
  ],
  "Thomas|PT 15": [
    "230x48x66",
    "230x96x33"
  ],
  "Thomas|T 35DT (Skid steer loader)": [
    "230x72x39"
  ],
  "Thomas|T-15S": [
    "230x96x33",
    "230x48x66"
  ],
  "Thomas|T-15V": [
    "230x96x33",
    "230x48x66"
  ],
  "Thomas|T-25S": [
    "300x52.5x76",
    "250x52.5x76",
    "300x52.5x76"
  ],
  "Thomas|T-35S": [
    "300x55x82",
    "300x52.5x84"
  ],
  "Thomas|T-45S": [
    "400x72.5x72"
  ],
  "Tifermec|T16": [
    "230x96x33",
    "230x48x66"
  ],
  "Top Steel|H115": [
    "180x72x38"
  ],
  "Top Steel|H85": [
    "180x72x38"
  ],
  "Top Steel|M26": [
    "180x60x34"
  ],
  "Top Steel|M31": [
    "180x60x34"
  ],
  "Top Steel|M41": [
    "180x72x31"
  ],
  "Top Tec|1850E": [
    "200x72x43"
  ],
  "Topcat|ZY55": [
    "400x72.5x72",
    "400x72.5x72"
  ],
  "Track Star|28": [
    "180x72x42"
  ],
  "Track Star|412": [
    "180x72x42"
  ],
  "Track Star|500": [
    "230x72x43"
  ],
  "Trackbull|Dumper": [
    "190x72x37",
    "180x72x37"
  ],
  "Trak|1500D (VTS System for Skidsteer Loader)": [
    "320x86x52",
    "375x86x52",
    "400x86x52"
  ],
  "Trak|1750D ( (VTS System for Skidsteer Loader)": [
    "375x86x52",
    "400x86x52"
  ],
  "Trak|1750D (VTS System for Skidsteer Loader)": [
    "320x86x52"
  ],
  "Traklift|TRA 21": [
    "200x72x43"
  ],
  "Trax|40 (US Market)": [
    "230x96x39",
    "250x48x78"
  ],
  "Traxmax|250": [
    "250x72x52"
  ],
  "Traxmax|550 (Compact Track Loader)": [
    "320x86x56"
  ],
  "Turchi|300 [OEM350x108x42]": [
    "350x108x42"
  ],
  "Turchi|300F [OEM300x55x79]": [
    "300x55x79",
    "320x100x43"
  ],
  "Turchi|EK 100B (Mini-dumper)": [
    "250x72x52"
  ],
  "Turchi|EK 200P (Mini-dumper)": [
    "250x72x52"
  ],
  "Unic|295": [
    "180x72x40"
  ],
  "Unic|506": [
    "300x52.5x88"
  ],
  "Unic|B-345 (Crane)": [
    "180x72x40"
  ],
  "Unic|B-506 (Crane)": [
    "300x52.5x88"
  ],
  "Unic|B-506-5.1 (Crane)": [
    "300x52.5x88"
  ],
  "Unic|B-775 (Crane)": [
    "400x72.5x82"
  ],
  "Unic|SMK 320.67 (Crane)": [
    "400x72.5x82"
  ],
  "Unic|UR 255CA": [
    "230x72x47"
  ],
  "Unic|URA-376CL (Crane)": [
    "300x52.5x88"
  ],
  "Unic|URA-506CL (Crane)": [
    "300x52.5x88"
  ],
  "Unic|URW-094 (Crane)": [
    "180x72x36"
  ],
  "Unic|URW-547 (Crane)": [
    "300x52.5x88"
  ],
  "Unic|URW-A 095CR (Crane)": [
    "180x72x40"
  ],
  "Unic|URW-A 295CR (Crane)": [
    "180x72x40"
  ],
  "Unic|W295 (Crane)": [
    "180x72x40"
  ],
  "Unimov|1250": [
    "200x72x40"
  ],
  "Unkauf|KMB 114G": [
    "230x72x43"
  ],
  "Upright|MXC 15": [
    "200x72x41"
  ],
  "Utex|1.03": [
    "230x72x43"
  ],
  "VIMALFIRE|Emergency Robot-G1": [
    "230x72x59"
  ],
  "Velcodrill|WD 100": [
    "320x100x52"
  ],
  "Venieri|VF121": [
    "230x72x43"
  ],
  "Venieri|VF141": [
    "230x72x43"
  ],
  "Venieri|VF161": [
    "230x72x43"
  ],
  "Venieri|VF171": [
    "230x72x43"
  ],
  "Vermeer|1.2 ton": [
    "230x72x39"
  ],
  "Vermeer|502 SP (Stump Cutter)": [
    "230x72x54"
  ],
  "Vermeer|BC1400TX": [
    "400x72.5x76"
  ],
  "Vermeer|BC150TX": [
    "250x72x52"
  ],
  "Vermeer|CTX 100": [
    "180x72x45"
  ],
  "Vermeer|CTX 160": [
    "180x72x35"
  ],
  "Vermeer|CTX 50": [
    "230x72x45"
  ],
  "Vermeer|CX 216 (mini-excavator)": [
    "230x72x45"
  ],
  "Vermeer|CX 218 (mini-excavator)": [
    "230x72x45"
  ],
  "Vermeer|CX 219 (mini-excavator)": [
    "300x55x72"
  ],
  "Vermeer|CX 224 (mini-excavator)": [
    "300x55x78",
    "300x52.5x80"
  ],
  "Vermeer|CX 229 (mini-excavator)": [
    "300x55x78",
    "300x52.5x80"
  ],
  "Vermeer|CX 234 (mini-excavator)": [
    "400x73x72",
    "400x72.5x72"
  ],
  "Vermeer|CX 254 (mini-excavator)": [
    "230x72x54"
  ],
  "Vermeer|D10a Navigator (H.D. Drilling machine)": [
    "230x72x54"
  ],
  "Vermeer|D10x15 Navigator (H.D. Drilling machine)": [
    "230x72x54"
  ],
  "Vermeer|D16x20 Navigator (H.D. Drilling machine) [OEM 230x72x54]": [
    "230x72x54"
  ],
  "Vermeer|D16x20a Navigator (H.D. Drilling machine) [OEM 230x72x54]": [
    "230x72x54",
    "300x52.5x74"
  ],
  "Vermeer|D20X22 series 2 (Directional drill)": [
    "300x52.5x74"
  ],
  "Vermeer|D23X30 series 3 (Directional drill)": [
    "300x52.5x74"
  ],
  "Vermeer|D4": [
    "230x72x54"
  ],
  "Vermeer|D6x6 Navigator (H.D. Drilling machine)": [
    "180x72x39"
  ],
  "Vermeer|D7": [
    "230x72x54"
  ],
  "Vermeer|D7x11 Navigator (H.D. Drilling machine)": [
    "230x72x54"
  ],
  "Vermeer|D7x11a Navigator (H.D. Drilling machine)": [
    "230x72x54"
  ],
  "Vermeer|D8x10 (H.D. Drilling machine)": [
    "180x72x47"
  ],
  "Vermeer|D9x13 Navigator (H.D. Drilling machine)": [
    "280x72x52",
    "250x72x52"
  ],
  "Vermeer|G10x15": [
    "230x72x54"
  ],
  "Vermeer|RTX 100 (Stump cutter)": [
    "180x60x28",
    "180x68x28"
  ],
  "Vermeer|RTX 1250 (Quad)": [
    "450x86x42"
  ],
  "Vermeer|RTX 150": [
    "180x60x28",
    "180x68x28"
  ],
  "Vermeer|RTX 250": [
    "180x72x39"
  ],
  "Vermeer|RTX 450": [
    "15x4x166",
    "381x101.6x42"
  ],
  "Vermeer|S400TX (Mini Compact Track Loader)": [
    "180x72x39"
  ],
  "Vermeer|S450TX (Mini Compact Track Loader)": [
    "180x72x41",
    "230x72x41"
  ],
  "Vermeer|S600TX (Mini Compact Track Loader)": [
    "180x72x39"
  ],
  "Vermeer|S650TX (Mini Compact Track Loader)": [
    "180x72x41",
    "230x72x41"
  ],
  "Vermeer|S725TX (Mini Compact Track Loader)": [
    "180x72x45",
    "230x72x45"
  ],
  "Vermeer|S800TX (Mini Compact Track Loader)": [
    "230x72x45"
  ],
  "Vermeer|S925TX (Mini Compact Track Loader)": [
    "180x72x45",
    "230x72x45"
  ],
  "Vermeer|SC 30TX (Stump cutter)": [
    "180x72x37"
  ],
  "Vermeer|SC 502SP (Stump cutter)": [
    "230x72x54"
  ],
  "Vermeer|SC 505 (Stump cutter)": [
    "230x72x54"
  ],
  "Vermeer|SC 60TX (Stump cutter)": [
    "230x72x54"
  ],
  "Vermeer|SC 70TX (Stump cutter)": [
    "230x72x54"
  ],
  "Vnk Crane Europe|URW A295CR": [
    "180x72x40"
  ],
  "Volvo|EC 13": [
    "200x96x33",
    "230x48x66"
  ],
  "Volvo|EC 13XR": [
    "200x96x33",
    "230x48x66"
  ],
  "Volvo|EC 13XTV": [
    "200x96x33",
    "230x48x66"
  ],
  "Volvo|EC 14": [
    "230x72x43"
  ],
  "Volvo|EC 15": [
    "230x96x33",
    "230x48x66"
  ],
  "Volvo|EC 15 (bi-speed / adj. Width)": [
    "230x96x33",
    "230x48x66"
  ],
  "Volvo|EC 15 (bi-speed)": [
    "230x96x33",
    "230x48x66"
  ],
  "Volvo|EC 15B": [
    "230x96x33",
    "230x48x66"
  ],
  "Volvo|EC 15B XR": [
    "230x96x33",
    "230x48x66"
  ],
  "Volvo|EC 15B XTV": [
    "230x96x33",
    "230x48x66"
  ],
  "Volvo|EC 15D": [
    "230x96x33",
    "230x48x66"
  ],
  "Volvo|EC 15R": [
    "230x72x43"
  ],
  "Volvo|EC 15RB": [
    "230x72x43"
  ],
  "Volvo|EC 15T": [
    "230x96x33",
    "230x48x66"
  ],
  "Volvo|EC 15TB": [
    "230x96x33",
    "230x48x66"
  ],
  "Volvo|EC 15V": [
    "230x96x33",
    "230x48x66"
  ],
  "Volvo|EC 15VB": [
    "230x96x33",
    "230x48x66"
  ],
  "Volvo|EC 15XR": [
    "230x96x33",
    "230x48x66"
  ],
  "Volvo|EC 15XT": [
    "230x96x33",
    "230x48x66"
  ],
  "Volvo|EC 15XTV": [
    "230x96x33",
    "230x48x66"
  ],
  "Volvo|EC 17": [
    "230x96x33",
    "230x48x66"
  ],
  "Volvo|EC 18": [
    "230x96x33",
    "230x48x66"
  ],
  "Volvo|EC 18D": [
    "230x96x33",
    "230x48x66"
  ],
  "Volvo|EC 25": [
    "300x109x38",
    "300x52.5x78"
  ],
  "Volvo|EC 25-281": [
    "300x109x38",
    "300x52.5x78"
  ],
  "Volvo|EC 25X": [
    "300x109x38",
    "300x52.5x78"
  ],
  "Volvo|EC 25XT": [
    "300x109x38",
    "300x52.5x78"
  ],
  "Volvo|EC 27C": [
    "300x109x38",
    "300x52.5x78"
  ],
  "Volvo|EC 30": [
    "300x109x38",
    "300x52.5x78"
  ],
  "Volvo|EC 30B": [
    "300x109x38",
    "300x52.5x78"
  ],
  "Volvo|EC 30X": [
    "300x109x38",
    "300x52.5x78"
  ],
  "Volvo|EC 35": [
    "300x109x41",
    "300x52.5x84"
  ],
  "Volvo|EC 35C": [
    "300x52.5x84"
  ],
  "Volvo|EC 35D": [
    "300x52.5x84"
  ],
  "Volvo|EC 45": [
    "400x72.5x68"
  ],
  "Volvo|EC 45Pro": [
    "400x72.5x68"
  ],
  "Volvo|EC 55": [
    "400x73x74",
    "400x72.5x74"
  ],
  "Volvo|EC 55B": [
    "400x73x74",
    "400x72.5x74"
  ],
  "Volvo|EC 55C": [
    "400x73x74",
    "400x72.5x74"
  ],
  "Volvo|EC 60E": [
    "400x72.5x74"
  ],
  "Volvo|ECR 25D": [
    "250x109x38",
    "300x52.5x78"
  ],
  "Volvo|ECR 28": [
    "250x109x38",
    "300x52.5x78"
  ],
  "Volvo|ECR 35D": [
    "300x52.5x84"
  ],
  "Volvo|ECR 38": [
    "300x109x41",
    "300x52.5x84"
  ],
  "Volvo|ECR 40D": [
    "300x52.5x84"
  ],
  "Volvo|ECR 48C": [
    "400x72.5x72"
  ],
  "Volvo|ECR 50D": [
    "400x72.5x74"
  ],
  "Volvo|ECR 58": [
    "400x72.5x74"
  ],
  "Volvo|ECR 58D": [
    "400x72.5x74"
  ],
  "Volvo|ECR 88": [
    "450x81x76"
  ],
  "Volvo|ECR 88D": [
    "450x81x76"
  ],
  "Volvo|MC 110 (VTS System for Skidsteer Loader)": [
    "450x86x56"
  ],
  "Volvo|MC 70 (Compact Track Loader)": [
    "320x86x52"
  ],
  "Volvo|MC 70 (VTS System for Skidsteer Loader)": [
    "320x86x52",
    "375x86x52",
    "400x86x52"
  ],
  "Volvo|MC 80 (VTS System for Skidsteer Loader": [
    "320x86x52"
  ],
  "Volvo|MC 80 (VTS System for Skidsteer Loader)": [
    "375x86x52",
    "400x86x52"
  ],
  "Volvo|MC 90 (VTS System for Skidsteer Loader)": [
    "450x86x56"
  ],
  "Volvo|MCT 110C (Compact Track Loader)": [
    "320x86x56",
    "450x86x56"
  ],
  "Volvo|MCT 125C (Compact Track Loader)": [
    "320x86x56",
    "450x86x56"
  ],
  "Volvo|MCT 135C (Compact Track Loader)": [
    "450x86x56"
  ],
  "Volvo|MCT 145C (Compact Track Loader)": [
    "450x86x56"
  ],
  "Volvo|MCT 85C (Compact Track Loader)": [
    "320x86x50"
  ],
  "WAMET|KB-2G": [
    "230x72x54"
  ],
  "WAMET|KB-3G": [
    "230x72x54"
  ],
  "WAMET|MWG-1 [OEM 230x72x43]": [
    "230x72x43",
    "230x72x48"
  ],
  "WAMET|MWG-6": [
    "230x72x54"
  ],
  "Wacker Neuson|11002HV": [
    "500x92x78"
  ],
  "Wacker Neuson|11002RD": [
    "500x92x78"
  ],
  "Wacker Neuson|1101CP (Compact Track Loader)": [
    "450x86x56"
  ],
  "Wacker Neuson|1200": [
    "230x72x43"
  ],
  "Wacker Neuson|12002": [
    "500x92x78"
  ],
  "Wacker Neuson|12002RD": [
    "500x92x78"
  ],
  "Wacker Neuson|12002RD Vario": [
    "500x92x78"
  ],
  "Wacker Neuson|1200RD": [
    "230x72x43"
  ],
  "Wacker Neuson|1202": [
    "230x72x43"
  ],
  "Wacker Neuson|1302": [
    "230x72x43"
  ],
  "Wacker Neuson|1302RD": [
    "230x72x43"
  ],
  "Wacker Neuson|1302RD SLR": [
    "230x72x43"
  ],
  "Wacker Neuson|1400RD": [
    "230x72x43"
  ],
  "Wacker Neuson|1402": [
    "230x72x43"
  ],
  "Wacker Neuson|1402RD (OEM 230x72x43)": [
    "230x72x43"
  ],
  "Wacker Neuson|1402RD (OEM 230x96x33)": [
    "230x96x33",
    "230x48x66"
  ],
  "Wacker Neuson|1402RD Force": [
    "230x96x33",
    "230x48x66"
  ],
  "Wacker Neuson|1402RD Primus": [
    "230x72x43"
  ],
  "Wacker Neuson|1402RD SLR": [
    "230x96x33",
    "230x72x43",
    "230x48x66"
  ],
  "Wacker Neuson|1402RD SLR Primus": [
    "230x96x33",
    "230x48x66"
  ],
  "Wacker Neuson|1403": [
    "230x96x36",
    "230x48x72"
  ],
  "Wacker Neuson|1403 ('2002)": [
    "230x96x36",
    "230x48x66"
  ],
  "Wacker Neuson|1403RD": [
    "230x96x33",
    "230x48x66"
  ],
  "Wacker Neuson|1404": [
    "230x96x33",
    "230x48x66"
  ],
  "Wacker Neuson|14504": [
    "500x92x84"
  ],
  "Wacker Neuson|1500": [
    "230x72x43"
  ],
  "Wacker Neuson|1500RD": [
    "230x72x43"
  ],
  "Wacker Neuson|1500RD SLR": [
    "230x72x43"
  ],
  "Wacker Neuson|1501": [
    "230x72x43"
  ],
  "Wacker Neuson|1502": [
    "230x72x43"
  ],
  "Wacker Neuson|1502RD": [
    "230x72x43"
  ],
  "Wacker Neuson|1502RD Force": [
    "230x96x33",
    "230x48x66"
  ],
  "Wacker Neuson|1502RD SLR": [
    "230x72x43"
  ],
  "Wacker Neuson|1503": [
    "230x96x36",
    "230x48x72"
  ],
  "Wacker Neuson|1503RD": [
    "230x96x36",
    "230x48x72"
  ],
  "Wacker Neuson|1503RDV": [
    "230x96x36",
    "230x48x72"
  ],
  "Wacker Neuson|1600RD": [
    "230x72x43"
  ],
  "Wacker Neuson|1700": [
    "230x72x48"
  ],
  "Wacker Neuson|1700RB": [
    "230x72x48"
  ],
  "Wacker Neuson|1700RD": [
    "230x72x48"
  ],
  "Wacker Neuson|1702": [
    "230x72x48"
  ],
  "Wacker Neuson|1702RD": [
    "230x72x48"
  ],
  "Wacker Neuson|1703": [
    "230x96x36",
    "230x48x72"
  ],
  "Wacker Neuson|1703 RD": [
    "230x96x36",
    "230x48x72"
  ],
  "Wacker Neuson|1703 VDS": [
    "230x96x36",
    "230x48x72"
  ],
  "Wacker Neuson|1900": [
    "230x72x48"
  ],
  "Wacker Neuson|1900RD": [
    "230x72x48"
  ],
  "Wacker Neuson|1902": [
    "230x72x48"
  ],
  "Wacker Neuson|1902RD (New)": [
    "230x96x36",
    "230x48x72"
  ],
  "Wacker Neuson|1902RD (old)": [
    "230x72x48"
  ],
  "Wacker Neuson|1902RD Force": [
    "230x96x36",
    "230x48x72"
  ],
  "Wacker Neuson|1902RD SLR (New)": [
    "230x72x48"
  ],
  "Wacker Neuson|1902RD SLR (old)": [
    "230x72x43"
  ],
  "Wacker Neuson|1903": [
    "250x96x38",
    "250x48x76"
  ],
  "Wacker Neuson|1903RD": [
    "250x96x38",
    "250x48x76"
  ],
  "Wacker Neuson|2000": [
    "230x72x43"
  ],
  "Wacker Neuson|2000RD": [
    "230x72x43"
  ],
  "Wacker Neuson|2002 Force": [
    "230x96x36",
    "230x48x72"
  ],
  "Wacker Neuson|2002 RDV": [
    "230x96x36",
    "230x48x72"
  ],
  "Wacker Neuson|2003": [
    "250x96x38",
    "250x48x76"
  ],
  "Wacker Neuson|2100": [
    "230x72x43"
  ],
  "Wacker Neuson|2100RD": [
    "230x72x43"
  ],
  "Wacker Neuson|2200": [
    "230x72x48"
  ],
  "Wacker Neuson|2200RD": [
    "230x72x48"
  ],
  "Wacker Neuson|2201": [
    "230x72x48"
  ],
  "Wacker Neuson|2202": [
    "230x72x48"
  ],
  "Wacker Neuson|2202RD": [
    "230x96x36",
    "230x72x48",
    "230x48x72"
  ],
  "Wacker Neuson|2202RD Force": [
    "230x96x36",
    "230x48x72"
  ],
  "Wacker Neuson|2203": [
    "250x96x38",
    "250x48x76"
  ],
  "Wacker Neuson|2203RD": [
    "250x96x38",
    "250x48x76"
  ],
  "Wacker Neuson|2300": [
    "230x72x43"
  ],
  "Wacker Neuson|2300RD": [
    "230x72x43"
  ],
  "Wacker Neuson|2404RD": [
    "250x109x37",
    "300x52.5x76"
  ],
  "Wacker Neuson|250": [
    "300x52.5x78",
    "300x52.5x78"
  ],
  "Wacker Neuson|2500": [
    "230x72x43"
  ],
  "Wacker Neuson|2500RD": [
    "230x72x43"
  ],
  "Wacker Neuson|2503": [
    "250x109x37",
    "300x52.5x76"
  ],
  "Wacker Neuson|2503RD": [
    "250x109x37",
    "300x101.6x39",
    "300x52.5x76",
    "300x52.5x84",
    "300x101.6x43"
  ],
  "Wacker Neuson|2503RDV": [
    "300x109x37",
    "300x52.5x76"
  ],
  "Wacker Neuson|2600": [
    "300x54x72",
    "300x52.5x74"
  ],
  "Wacker Neuson|2600RD (New)": [
    "300x55x72",
    "300x52.5x74"
  ],
  "Wacker Neuson|2700": [
    "230x72x43"
  ],
  "Wacker Neuson|2700RD": [
    "230x72x43"
  ],
  "Wacker Neuson|2702": [
    "300x54x72",
    "300x52.5x74"
  ],
  "Wacker Neuson|2702RD": [
    "300x55x72",
    "300x52.5x74"
  ],
  "Wacker Neuson|2702RD Force": [
    "300x55x72",
    "300x52.5x74"
  ],
  "Wacker Neuson|2702RD SCR": [
    "300x55x72",
    "300x52.5x74"
  ],
  "Wacker Neuson|2702RD SLR": [
    "300x55x72",
    "300x52.5x74"
  ],
  "Wacker Neuson|2800": [
    "300x54x72",
    "300x52.5x74"
  ],
  "Wacker Neuson|2800RD (New)": [
    "300x55x72",
    "300x52.5x74"
  ],
  "Wacker Neuson|28Z-3": [
    "300x55x79",
    "300x52.5x82"
  ],
  "Wacker Neuson|28Z3 RD": [
    "300x55x79",
    "300x52.5x82"
  ],
  "Wacker Neuson|2902": [
    "300x54x72",
    "300x52.5x74"
  ],
  "Wacker Neuson|2902RD": [
    "300x55x72",
    "300x52.5x74"
  ],
  "Wacker Neuson|2902RD Force": [
    "300x54x72",
    "300x52.5x74"
  ],
  "Wacker Neuson|2902RD SLR": [
    "300x54x72",
    "300x52.5x74"
  ],
  "Wacker Neuson|3000": [
    "320x54x78",
    "300x52.5x80"
  ],
  "Wacker Neuson|3000RD (New)": [
    "320x54x78",
    "300x52.5x80"
  ],
  "Wacker Neuson|3000RDV": [
    "320x54x78",
    "300x52.5x80"
  ],
  "Wacker Neuson|3002": [
    "300x109x38",
    "300x52.5x78"
  ],
  "Wacker Neuson|3003": [
    "300x109x38",
    "300x52.5x78"
  ],
  "Wacker Neuson|3003 RD": [
    "300x101.6x40",
    "300x52.5x78"
  ],
  "Wacker Neuson|3003 Vario": [
    "300x109x38",
    "300x52.5x78"
  ],
  "Wacker Neuson|3003RD": [
    "300x109x38",
    "300x52.5x78"
  ],
  "Wacker Neuson|3200RD (New)": [
    "320x54x78",
    "300x52.5x80"
  ],
  "Wacker Neuson|3402": [
    "320x54x78",
    "300x52.5x80"
  ],
  "Wacker Neuson|3402RD": [
    "320x54x78",
    "300x52.5x80"
  ],
  "Wacker Neuson|3402RD Force": [
    "320x54x78",
    "300x52.5x80"
  ],
  "Wacker Neuson|3402RD SLR": [
    "320x54x78",
    "300x52.5x80"
  ],
  "Wacker Neuson|3503": [
    "300x52.5x84"
  ],
  "Wacker Neuson|3503 VDS": [
    "300x52.5x84"
  ],
  "Wacker Neuson|3503 Vario": [
    "300x109x41",
    "300x52.5x84"
  ],
  "Wacker Neuson|3503RD": [
    "300x109x41",
    "300x52.5x84"
  ],
  "Wacker Neuson|3503RD Vario": [
    "300x109x41",
    "300x52.5x84"
  ],
  "Wacker Neuson|3602": [
    "320x54x78",
    "300x52.5x80"
  ],
  "Wacker Neuson|3602RD": [
    "320x54x78",
    "300x52.5x80"
  ],
  "Wacker Neuson|3602RD Force": [
    "320x54x78",
    "300x52.5x80"
  ],
  "Wacker Neuson|3602RD SLR": [
    "320x54x78",
    "300x52.5x80"
  ],
  "Wacker Neuson|3703": [
    "300x109x41",
    "300x52.5x84"
  ],
  "Wacker Neuson|3703RD": [
    "300x109x41",
    "300x52.5x84"
  ],
  "Wacker Neuson|38Z-3": [
    "300x109x41",
    "300x52.5x84"
  ],
  "Wacker Neuson|38Z3": [
    "300x109x41",
    "300x52.5x84"
  ],
  "Wacker Neuson|5000RD": [
    "400x73x74",
    "400x72.5x74"
  ],
  "Wacker Neuson|5001": [
    "400x73x74",
    "400x72.5x74"
  ],
  "Wacker Neuson|5001RD": [
    "400x73x74",
    "400x72.5x74"
  ],
  "Wacker Neuson|5001RD SLR": [
    "400x73x74",
    "400x72.5x74"
  ],
  "Wacker Neuson|5002": [
    "400x73x74",
    "400x72.5x74"
  ],
  "Wacker Neuson|5002 Power": [
    "400x73x74",
    "400x72.5x74"
  ],
  "Wacker Neuson|5002RD": [
    "400x73x74",
    "400x135x39",
    "400x72.5x74"
  ],
  "Wacker Neuson|50Z-3": [
    "400x72.5x74"
  ],
  "Wacker Neuson|50Z-3RD": [
    "400x73x74",
    "400x72.5x74"
  ],
  "Wacker Neuson|6002": [
    "400x73x74",
    "400x72.5x74"
  ],
  "Wacker Neuson|6002RD": [
    "400x73x74",
    "400x135x39",
    "400x72.5x74"
  ],
  "Wacker Neuson|6002RDV": [
    "400x73x74",
    "400x72.5x74"
  ],
  "Wacker Neuson|6003": [
    "400x72.5x74"
  ],
  "Wacker Neuson|6003RD": [
    "400x73x74",
    "400x72.5x74"
  ],
  "Wacker Neuson|7002RD": [
    "450x71x84"
  ],
  "Wacker Neuson|70Z-3RD": [
    "450x71x86"
  ],
  "Wacker Neuson|75Z-3": [
    "450x71x86"
  ],
  "Wacker Neuson|8002": [
    "450x71x84"
  ],
  "Wacker Neuson|8002RD": [
    "450x71x84"
  ],
  "Wacker Neuson|8002RDV": [
    "450x71x84"
  ],
  "Wacker Neuson|8003 Vario": [
    "450x76x80"
  ],
  "Wacker Neuson|8003RD": [
    "450x76x80"
  ],
  "Wacker Neuson|803RD": [
    "180x72x37"
  ],
  "Wacker Neuson|9002": [
    "500x92x78"
  ],
  "Wacker Neuson|DT 08 (Dumper)": [
    "180x72x34"
  ],
  "Wacker Neuson|DT 10 (Dumper)": [
    "180x72x37"
  ],
  "Wacker Neuson|DT 10e (Dumper)": [
    "180x72x37"
  ],
  "Wacker Neuson|DT 12 (Dumper)": [
    "180x72x37"
  ],
  "Wacker Neuson|DT 15 (Duper)": [
    "230x72x52"
  ],
  "Wacker Neuson|ET145": [
    "500x92x84"
  ],
  "Wacker Neuson|ET16": [
    "230x96x33",
    "230x48x66"
  ],
  "Wacker Neuson|ET18": [
    "230x96x36",
    "230x48x72"
  ],
  "Wacker Neuson|ET20": [
    "250x96x38",
    "250x48x76"
  ],
  "Wacker Neuson|ET24": [
    "250x109x37",
    "300x52.5x76"
  ],
  "Wacker Neuson|ET35": [
    "300x53x84"
  ],
  "Wacker Neuson|ET58": [
    "400x72.5x74"
  ],
  "Wacker Neuson|ET65": [
    "400x72.5x74"
  ],
  "Wacker Neuson|ET90": [
    "450x76x80"
  ],
  "Wacker Neuson|EZ17": [
    "230x96x36",
    "230x48x72"
  ],
  "Wacker Neuson|EZ17e": [
    "230x96x36",
    "230x48x72"
  ],
  "Wacker Neuson|EZ26": [
    "300x52.5x82"
  ],
  "Wacker Neuson|EZ28": [
    "300x52.5x82"
  ],
  "Wacker Neuson|EZ36": [
    "300x53x84"
  ],
  "Wacker Neuson|EZ38": [
    "300x52.5x84"
  ],
  "Wacker Neuson|EZ50": [
    "400x72.5x74"
  ],
  "Wacker Neuson|EZ53": [
    "400x72.5x74"
  ],
  "Wacker Neuson|EZ80": [
    "450x76x80"
  ],
  "Wacker Neuson|RK 15 (Carrier)": [
    "230x72x40"
  ],
  "Wacker Neuson|SM325-27T": [
    "230x72x37"
  ],
  "Wacker Neuson|ST 28": [
    "320x86x52",
    "400x86x52"
  ],
  "Wacker Neuson|ST 31": [
    "320x86x52",
    "400x86x52"
  ],
  "Wacker Neuson|ST 35": [
    "450x86x56"
  ],
  "Wacker Neuson|ST 45": [
    "450x86x56"
  ],
  "Wacker Neuson|TD 15 (Carrier)": [
    "250x72x56"
  ],
  "Wacker Neuson|TD 9 (Dumper)": [
    "180x72x37"
  ],
  "Wacker Neuson|Unitrac BF 250": [
    "320x54x78",
    "300x52.5x80"
  ],
  "Wyssen|W-10/RK700": [
    "190x72x37",
    "180x72x37"
  ],
  "XCMG|XE55U": [
    "400x72.5x74"
  ],
  "Yamaguchi / Winbull|TXB-21": [
    "200x72x39"
  ],
  "Yamaguchi / Winbull|WB 04": [
    "180x60x38"
  ],
  "Yamaguchi / Winbull|WB 05 (minidumper)": [
    "200x72x35",
    "200x72x39"
  ],
  "Yamaguchi / Winbull|WB 05 (minidumper) '2004": [
    "200x72x34",
    "180x72x34"
  ],
  "Yamaguchi / Winbull|WB 06D (minidumper)": [
    "180x72x39"
  ],
  "Yamaguchi / Winbull|WB 06D HL (Minidumper - High Lift)": [
    "180x72x39"
  ],
  "Yamaguchi / Winbull|WB 07 (minidumper)": [
    "200x72x39"
  ],
  "Yamaguchi / Winbull|WB 1000-3 (minidumper)": [
    "230x72x45",
    "230x72x46"
  ],
  "Yamaguchi / Winbull|WB 12H (minidumper)": [
    "230x72x50"
  ],
  "Yamaguchi / Winbull|WB 1300-3 (minidumper)": [
    "280x72x52",
    "250x72x52"
  ],
  "Yamaguchi / Winbull|WB 1500-3 (minidumper)": [
    "280x72x52",
    "250x72x52"
  ],
  "Yamaguchi / Winbull|WB 350FB (minidumper)": [
    "180x60x34"
  ],
  "Yamaguchi / Winbull|WB 350SF (minidumper)": [
    "180x60x34"
  ],
  "Yamaguchi / Winbull|WB 450HD (minitdumper)": [
    "200x72x34",
    "180x72x34"
  ],
  "Yamaguchi / Winbull|WB 450MD (minidumper)": [
    "200x72x34",
    "180x72x34"
  ],
  "Yamaguchi / Winbull|WB 500 (minidumper)": [
    "200x72x34",
    "180x72x34"
  ],
  "Yamaguchi / Winbull|WB 510 (minidumper)": [
    "200x72x34",
    "180x72x34"
  ],
  "Yamaguchi / Winbull|WB 510B (minidumper)": [
    "200x72x34",
    "180x72x34"
  ],
  "Yamaguchi / Winbull|WB 700 (minidumper)": [
    "200x72x39"
  ],
  "Yamaguchi / Winbull|WB 700EX (minidumper)": [
    "200x72x39"
  ],
  "Yamaguchi / Winbull|WB12H alpha": [
    "230x72x50"
  ],
  "Yanmar|5 D-1": [
    "230x72x50"
  ],
  "Yanmar|8 R": [
    "230x72x50"
  ],
  "Yanmar|Aura 28": [
    "300x52.5x78"
  ],
  "Yanmar|B 07": [
    "180x72x37"
  ],
  "Yanmar|B 07-1": [
    "180x72x37"
  ],
  "Yanmar|B 08 Scopy": [
    "180x72x37"
  ],
  "Yanmar|B 08 [OEM 180x72x32]": [
    "180x72x32",
    "180x72x37"
  ],
  "Yanmar|B 08-3 ('2002)": [
    "180x72x37"
  ],
  "Yanmar|B 08-3RV": [
    "180x72x37"
  ],
  "Yanmar|B 08R Scopy": [
    "180x72x37"
  ],
  "Yanmar|B 08RV Scopy": [
    "180x72x37"
  ],
  "Yanmar|B 10": [
    "200x72x39",
    "230x72x43"
  ],
  "Yanmar|B 10R": [
    "200x72x39"
  ],
  "Yanmar|B 12": [
    "230x72x43"
  ],
  "Yanmar|B 12-1": [
    "230x72x43"
  ],
  "Yanmar|B 12-2": [
    "230x72x43"
  ],
  "Yanmar|B 12-3": [
    "230x72x43"
  ],
  "Yanmar|B 12-3 ('2002)": [
    "200x72x47"
  ],
  "Yanmar|B 12-3PR": [
    "230x72x43"
  ],
  "Yanmar|B 12PR": [
    "230x72x43"
  ],
  "Yanmar|B 14 Check Length": [
    "200x72x47",
    "230x72x43",
    "230x72x47"
  ],
  "Yanmar|B 14-1": [
    "230x72x43"
  ],
  "Yanmar|B 15 [OEM 230x72x43]": [
    "230x72x43",
    "230x96x32"
  ],
  "Yanmar|B 15-3 ('2002)": [
    "200x72x47"
  ],
  "Yanmar|B 15-3CR": [
    "200x72x42"
  ],
  "Yanmar|B 15-3EX": [
    "230x72x47"
  ],
  "Yanmar|B 15-3PR": [
    "200x72x47"
  ],
  "Yanmar|B 15CR": [
    "200x72x47"
  ],
  "Yanmar|B 15EX": [
    "230x72x47"
  ],
  "Yanmar|B 15MC": [
    "200x72x47"
  ],
  "Yanmar|B 15PR": [
    "230x72x43"
  ],
  "Yanmar|B 17": [
    "230x72x43"
  ],
  "Yanmar|B 17-1": [
    "230x72x43"
  ],
  "Yanmar|B 17-2": [
    "230x72x43",
    "230x72x47"
  ],
  "Yanmar|B 17-2 (< '2000)": [
    "230x72x43"
  ],
  "Yanmar|B 17-3": [
    "200x72x47"
  ],
  "Yanmar|B 17-3EX": [
    "230x72x47"
  ],
  "Yanmar|B 17EX": [
    "230x72x47"
  ],
  "Yanmar|B 17PR": [
    "230x72x43"
  ],
  "Yanmar|B 18EX": [
    "230x72x47"
  ],
  "Yanmar|B 19": [
    "260x96x38",
    "250x48x76"
  ],
  "Yanmar|B 19.2": [
    "260x96x38",
    "250x48x76"
  ],
  "Yanmar|B 19PR": [
    "260x96x38",
    "250x48x76"
  ],
  "Yanmar|B 1U": [
    "200x72x40"
  ],
  "Yanmar|B 25V (Victas: offset type)": [
    "300x55.5x76"
  ],
  "Yanmar|B 25V (Victas: offset type) >'2006": [
    "260x55.5x78",
    "300x55.5x78"
  ],
  "Yanmar|B 25VCR (Offset type)": [
    "300x55.5x76"
  ],
  "Yanmar|B 25VCR (Victas: offset type) > '2006": [
    "260x55.5x78",
    "300x55.5x78"
  ],
  "Yanmar|B 27-2A [OEM 300x55.5(k)x76]": [
    "300x55.5x76",
    "320x106x39"
  ],
  "Yanmar|B 27-2B (Offset type)": [
    "300x55.5x82"
  ],
  "Yanmar|B 3-3": [
    "300x55.5x82"
  ],
  "Yanmar|B 30V (Victas: Offset type)": [
    "300x55.5x82"
  ],
  "Yanmar|B 30VCR (Victas: Offset type)": [
    "300x55.5x82"
  ],
  "Yanmar|B 30VPR (Victas: Offset type)": [
    "300x55.5x82"
  ],
  "Yanmar|B 37-2B (Offset type)": [
    "300x55.5x82"
  ],
  "Yanmar|B 37V (Victas: Offset type)": [
    "300x55.5x82"
  ],
  "Yanmar|B 37VCR (Offset type)": [
    "300x55.5x82"
  ],
  "Yanmar|B 37VPR (Offset type)": [
    "300x55.5x82"
  ],
  "Yanmar|B 3U": [
    "300x52.5x80",
    "300x55x77"
  ],
  "Yanmar|B 40VIO": [
    "350x75.5x74",
    "400x75.5x74"
  ],
  "Yanmar|B 4U": [
    "300x52.5x84",
    "300x55x81"
  ],
  "Yanmar|B 50-2B (Offset type)": [
    "400x75.5x74"
  ],
  "Yanmar|B 50V (Victas: Offset type)": [
    "400x75.5x74"
  ],
  "Yanmar|B 50VCR (Victas: Offset type)": [
    "400x75.5x74"
  ],
  "Yanmar|B 50VIO": [
    "400x75.5x74"
  ],
  "Yanmar|B 7 Pro Sigma": [
    "450x83.5x74"
  ],
  "Yanmar|B 7 Sigma": [
    "450x83.5x74"
  ],
  "Yanmar|B 7U": [
    "450x163x38",
    "450x81x76"
  ],
  "Yanmar|B6-3": [
    "400x75.5x74"
  ],
  "Yanmar|C 08 (Carrier)": [
    "180x72x36"
  ],
  "Yanmar|C 10R (Carrier)": [
    "230x72x50"
  ],
  "Yanmar|C 10R-1 (Carrier)": [
    "230x72x50"
  ],
  "Yanmar|C 12R (Carrier)": [
    "230x72x50"
  ],
  "Yanmar|C 50R-1 (carrier) [OEM 450x110x74]": [
    "450x110x74"
  ],
  "Yanmar|C 50R-1 (carrier) [OEM 500x90x82]": [
    "500x90x82"
  ],
  "Yanmar|C 8R (Carrier)": [
    "230x72x50"
  ],
  "Yanmar|CD 7CDA": [
    "230x72x50"
  ],
  "Yanmar|CG 3 HAST (Carrier)": [
    "180x60x37"
  ],
  "Yanmar|CG 3D (Carrier)": [
    "200x72x37",
    "180x72x37"
  ],
  "Yanmar|CR 10": [
    "230x72x50"
  ],
  "Yanmar|CR 12R": [
    "230x72x50"
  ],
  "Yanmar|DC 153": [
    "200x72x37",
    "200x72x39",
    "180x72x37"
  ],
  "Yanmar|K4SC (Sky lifter)": [
    "180x72x41"
  ],
  "Yanmar|MCG 100 (Carrier)": [
    "160x60x37",
    "180x60x37"
  ],
  "Yanmar|MCG 111F (Carrier)": [
    "180x60x37"
  ],
  "Yanmar|MCG 130 (Carrier)": [
    "200x72x31",
    "180x72x31"
  ],
  "Yanmar|MCG 131 (Carrier)": [
    "180x72x34"
  ],
  "Yanmar|MCG 150 (Carrier)": [
    "200x72x38",
    "180x72x38"
  ],
  "Yanmar|MCG 91 (Carrier)": [
    "160x60x34",
    "180x60x34"
  ],
  "Yanmar|MCG 95 (Carrier)": [
    "160x60x35",
    "180x60x35"
  ],
  "Yanmar|MCG 95 N-HST": [
    "180x60x37"
  ],
  "Yanmar|MCG 950 (Carrier)": [
    "180x60x37"
  ],
  "Yanmar|SV 08": [
    "180x72x37"
  ],
  "Yanmar|SV 09": [
    "180x72x37"
  ],
  "Yanmar|SV 100": [
    "485x92x72"
  ],
  "Yanmar|SV 100VCR": [
    "485x92x72"
  ],
  "Yanmar|SV 120": [
    "500x92x78"
  ],
  "Yanmar|SV 15": [
    "230x72x47"
  ],
  "Yanmar|SV 15CR": [
    "230x72x47"
  ],
  "Yanmar|SV 15PR": [
    "230x72x47"
  ],
  "Yanmar|SV 16": [
    "230x72x47"
  ],
  "Yanmar|SV 17": [
    "230x72x47"
  ],
  "Yanmar|SV 17CR": [
    "230x72x47"
  ],
  "Yanmar|SV 17CRE": [
    "230x72x47"
  ],
  "Yanmar|SV 17EX": [
    "230x72x47"
  ],
  "Yanmar|SV 18EX": [
    "230x72x47"
  ],
  "Yanmar|SV 20": [
    "250x48.5x84"
  ],
  "Yanmar|SV 22": [
    "250x48.5x84"
  ],
  "Yanmar|SV 26": [
    "250x55.5x79"
  ],
  "Yanmar|SV 60": [
    "400x73x76"
  ],
  "Yanmar|T175 (Compact Track Loader)": [
    "320x86x54"
  ],
  "Yanmar|T210 (Compact Track Loader)": [
    "450x86x56"
  ],
  "Yanmar|VIO 10": [
    "180x72x43",
    "200x72x43"
  ],
  "Yanmar|VIO 100": [
    "485x92x72"
  ],
  "Yanmar|VIO 12": [
    "180x72x43",
    "200x72x43"
  ],
  "Yanmar|VIO 15": [
    "230x72x47"
  ],
  "Yanmar|VIO 15-2": [
    "230x72x47"
  ],
  "Yanmar|VIO 17 [OEM 230x72x46]": [
    "230x72x46"
  ],
  "Yanmar|VIO 17 [OEM 230x72x47]": [
    "230x72x47"
  ],
  "Yanmar|VIO 17PR [OEM 230x72x47]": [
    "230x72x47"
  ],
  "Yanmar|VIO 20": [
    "260x97x40",
    "250x48.5x80"
  ],
  "Yanmar|VIO 20 Global": [
    "250x48.5x84"
  ],
  "Yanmar|VIO 20-1": [
    "260x97x42",
    "250x48.5x84"
  ],
  "Yanmar|VIO 20-2": [
    "260x97x42",
    "250x48.5x84"
  ],
  "Yanmar|VIO 20-3 (offset type)": [
    "250x48.5x84"
  ],
  "Yanmar|VIO 20-4 (offset type)": [
    "250x48.5x84"
  ],
  "Yanmar|VIO 20CR": [
    "250x48.5x84"
  ],
  "Yanmar|VIO 20PR-1": [
    "250x48.5x84"
  ],
  "Yanmar|VIO 25 [OEM 250x55.5x79 Symetric)": [
    "250x55.5x79"
  ],
  "Yanmar|VIO 25 [OEM 260x55.5x78 Offset)": [
    "260x55.5x78",
    "300x55.5x78"
  ],
  "Yanmar|VIO 25-4": [
    "260x55.5x78",
    "300x55.5x78"
  ],
  "Yanmar|VIO 25-6": [
    "250x55.5x79"
  ],
  "Yanmar|VIO 25PR": [
    "260x55.5x78",
    "300x55.5x78"
  ],
  "Yanmar|VIO 26": [
    "250x55.5x79"
  ],
  "Yanmar|VIO 27": [
    "260x55.5x78",
    "300x55.5x78"
  ],
  "Yanmar|VIO 27-2 (Offset type)": [
    "260x55.5x78",
    "300x55.5x78"
  ],
  "Yanmar|VIO 27-2 Global (Offset type)": [
    "260x55.5x78",
    "300x55.5x78"
  ],
  "Yanmar|VIO 27-3": [
    "260x55.5x78",
    "300x55.5x78"
  ],
  "Yanmar|VIO 27-5": [
    "260x55.5x78",
    "300x55.5x78"
  ],
  "Yanmar|VIO 27-6": [
    "250x55.5x79"
  ],
  "Yanmar|VIO 30-1": [
    "300x55.5x82"
  ],
  "Yanmar|VIO 30-2": [
    "300x55.5x82"
  ],
  "Yanmar|VIO 30-3S": [
    "300x55.5x82"
  ],
  "Yanmar|VIO 30-6": [
    "300x55x84",
    "300x52.5x88"
  ],
  "Yanmar|VIO 30V (Offset type)": [
    "300x55.5x82"
  ],
  "Yanmar|VIO 33 (Offset type)": [
    "300x55.5x82"
  ],
  "Yanmar|VIO 33-6": [
    "300x55x84",
    "300x52.5x82"
  ],
  "Yanmar|VIO 35 (Offset type)": [
    "300x55.5x82"
  ],
  "Yanmar|VIO 35 Global": [
    "300x55.5x82"
  ],
  "Yanmar|VIO 35-1 (Offset type)": [
    "300x55.5x82"
  ],
  "Yanmar|VIO 35-2 (Offset type)": [
    "300x55.5x82"
  ],
  "Yanmar|VIO 35-3 (Offset type)": [
    "300x55.5x82"
  ],
  "Yanmar|VIO 35-5 (Offset type)": [
    "300x55.5x82"
  ],
  "Yanmar|VIO 35-6": [
    "300x55x84",
    "300x52.5x88"
  ],
  "Yanmar|VIO 35CR (Offset type)": [
    "300x55.5x82"
  ],
  "Yanmar|VIO 38 (Offset type)": [
    "300x55.5x82"
  ],
  "Yanmar|VIO 38-6": [
    "300x55x84",
    "300x52.5x88"
  ],
  "Yanmar|VIO 40 (Offset type)": [
    "350x75.5x74",
    "400x75.5x74"
  ],
  "Yanmar|VIO 40-1 (Offset type)": [
    "350x75.5x74",
    "400x75.5x74"
  ],
  "Yanmar|VIO 40-2 (Offset type)": [
    "350x75.5x74",
    "400x75.5x74"
  ],
  "Yanmar|VIO 40-3 (Offset type)": [
    "350x75.5x74",
    "400x75.5x74"
  ],
  "Yanmar|VIO 40V (Offset type)": [
    "350x75.5x74",
    "400x75.5x74"
  ],
  "Yanmar|VIO 45 (Offset type)": [
    "350x75.5x74",
    "400x75.5x74"
  ],
  "Yanmar|VIO 45 CR": [
    "350x75.5x74",
    "400x75.5x74"
  ],
  "Yanmar|VIO 45 Global (Offset type)": [
    "350x75.5x74",
    "400x75.5x74"
  ],
  "Yanmar|VIO 45-3 (Offset type)": [
    "350x75.5x74",
    "400x75.5x74"
  ],
  "Yanmar|VIO 45-5 (Offset type)": [
    "350x75.5x74",
    "400x75.5x74"
  ],
  "Yanmar|VIO 45-6": [
    "350x73x76"
  ],
  "Yanmar|VIO 45V (Offset type)": [
    "350x75.5x74",
    "400x75.5x74"
  ],
  "Yanmar|VIO 50-1 (Offset type)": [
    "400x75.5x74"
  ],
  "Yanmar|VIO 50-2 (Offset type)": [
    "400x75.5x74"
  ],
  "Yanmar|VIO 50-2 Global": [
    "400x75.5x74"
  ],
  "Yanmar|VIO 50-3 (Offset type)": [
    "400x75.5x74"
  ],
  "Yanmar|VIO 50-6": [
    "350x73x76"
  ],
  "Yanmar|VIO 50-PR-1": [
    "400x75.5x74"
  ],
  "Yanmar|VIO 50U (Offset type)": [
    "350x75.5x74",
    "400x75.5x74"
  ],
  "Yanmar|VIO 50V (Offset type)": [
    "400x75.5x74"
  ],
  "Yanmar|VIO 55 (Offset type)": [
    "400x75.5x74"
  ],
  "Yanmar|VIO 55 CR": [
    "400x75.5x74"
  ],
  "Yanmar|VIO 55-3 (Offset type)": [
    "400x75.5x74"
  ],
  "Yanmar|VIO 55-5 (Offset type)": [
    "400x75.5x74"
  ],
  "Yanmar|VIO 55-6": [
    "400x73x76"
  ],
  "Yanmar|VIO 57-6": [
    "400x73x76"
  ],
  "Yanmar|VIO 57U": [
    "400x75.5x74"
  ],
  "Yanmar|VIO 70": [
    "450x84x74",
    "450x81x76"
  ],
  "Yanmar|VIO 70A (Offset type)": [
    "450x83.5x74"
  ],
  "Yanmar|VIO 70CR": [
    "450x84x74",
    "450x81x76"
  ],
  "Yanmar|VIO 75 (Offset type)": [
    "450x83.5x74"
  ],
  "Yanmar|VIO 75-A (Offset type)": [
    "450x83.5x74"
  ],
  "Yanmar|VIO 80 (Offset type)": [
    "450x83.5x74"
  ],
  "Yanmar|VIO 80-1": [
    "450x83.5x74"
  ],
  "Yanmar|VIO 82": [
    "450x83.5x74"
  ],
  "Yanmar|WB 1300": [
    "280x72x52",
    "250x72x52"
  ],
  "Yanmar|WB 500 (minidumper)": [
    "200x72x34",
    "180x72x34"
  ],
  "Yanmar|Y 12": [
    "230x72x43"
  ],
  "Yanmar|Y 12B": [
    "230x72x43"
  ],
  "Yanmar|Y 14": [
    "230x72x43"
  ],
  "Yanmar|YB 10": [
    "230x72x43"
  ],
  "Yanmar|YB 10-2": [
    "230x72x43"
  ],
  "Yanmar|YB 101": [
    "200x72x39"
  ],
  "Yanmar|YB 101UZ": [
    "200x72x39"
  ],
  "Yanmar|YB 101VL": [
    "200x72x39"
  ],
  "Yanmar|YB 121": [
    "230x72x43"
  ],
  "Yanmar|YB 125": [
    "260x55.5x78",
    "300x55.5x78"
  ],
  "Yanmar|YB 151": [
    "230x72x43"
  ],
  "Yanmar|YBT 650": [
    "230x72x43"
  ],
  "Yanmar|YEW 5D-1": [
    "230x72x50",
    "250x72x35"
  ],
  "Yanmar|YEW 8R": [
    "230x72x50"
  ],
  "Yanmar|YFW 8R (Mini-dumper)": [
    "230x72x50"
  ],
  "Yanmar|YM 10": [
    "200x72x34",
    "180x72x34"
  ],
  "Yanmar|YMD 60": [
    "200x72x34",
    "180x72x34"
  ],
  "Ygry|M 120": [
    "230x72x43"
  ],
  "Ygry|SA 140": [
    "230x72x43"
  ],
  "Ygry|SA 170": [
    "250x72x47"
  ],
  "Ygry|Y 12": [
    "230x72x43"
  ],
  "Ygry|Y 12B": [
    "230x72x43"
  ],
  "Ygry|Y 14": [
    "230x72x43"
  ],
  "Ygry|Y 14B": [
    "230x72x43"
  ],
  "Ygry|Y 15": [
    "230x72x47"
  ],
  "Yuchai|R 103.3": [
    "230x72x43"
  ],
  "Yuchai|R 105.3": [
    "230x72x43"
  ],
  "Yuchai|WY 1.3": [
    "230x72x43"
  ],
  "Yuchai|WY 2.5": [
    "300x109x38",
    "300x52.5x78"
  ],
  "Yuchai|WY 3.5": [
    "300x109x41",
    "300x52.5x84"
  ],
  "Yuchai|YC 15-7": [
    "230x72x43"
  ],
  "Yuchai|YC 15-8": [
    "230x72x43"
  ],
  "Yuchai|YC 25": [
    "300x55x76",
    "300x52.5x78"
  ],
  "Yuchai|YC 25-2": [
    "300x55x76",
    "300x52.5x78"
  ],
  "Yuchai|YC 25-8": [
    "300x55x76",
    "300x52.5x78"
  ],
  "Yuchai|YC 30-2": [
    "300x55x76",
    "300x52.5x78"
  ],
  "Yuchai|YC 35 SR": [
    "300x55x82",
    "300x52.5x84"
  ],
  "Yuchai|YC 35-7": [
    "300x55x82",
    "300x52.5x84"
  ],
  "Yuchai|YC 35-8": [
    "300x52.5x84",
    "300x52.5x84"
  ],
  "Yuchai|YC 45 [OEM 300x55x86]": [
    "300x55x86"
  ],
  "Yuchai|YC 45-6 [OEM 300x55x94]": [
    "300x55x94"
  ],
  "Yuchai|YC 55-2": [
    "400x73x74",
    "400x72.5x74"
  ],
  "Yuchai|YC 85": [
    "450x76x80"
  ],
  "Yuchai|YC 85-7": [
    "450x76x80"
  ],
  "Yutani|B 53": [
    "450x81.5x74",
    "450x81x76"
  ],
  "Yutani|B 76": [
    "450x81.5x74",
    "450x81x76"
  ],
  "Yutani|Z 53": [
    "300x109x38",
    "300x52.5x78"
  ],
  "Yutani|Z 54": [
    "300x109x40",
    "300x52.5x82"
  ],
  "Yutani|Z 55": [
    "350x108x42",
    "350x52.5x86"
  ],
  "Zavattini|E19P/9SC": [
    "250x72x52"
  ],
  "Zeppelin|ZR 02": [
    "230x96x33",
    "230x48x66"
  ],
  "Zeppelin|ZR 14": [
    "300x55x72",
    "300x52.5x74"
  ],
  "Zeppelin|ZR 15": [
    "230x96x33",
    "230x48x66"
  ],
  "Zeppelin|ZR 25": [
    "300x55x72",
    "300x52.5x74"
  ],
  "Zeppelin|ZR 35": [
    "300x55x78",
    "300x52.5x80"
  ],
  "Zeppelin|ZR 45": [
    "400x72.5x72"
  ],
  "Zeppelin|ZR 55": [
    "400x72.5x76"
  ],
  "Zeppelin|ZRH 02": [
    "230x96x33",
    "230x48x66"
  ],
  "Zeppelin|ZRH 04": [
    "300x109x36",
    "300x52.5x74"
  ],
  "Zeppelin|ZRH 12": [
    "230x96x33",
    "230x48x66"
  ],
  "Zeppelin|ZRH 14": [
    "300x55x72",
    "300x52.5x74"
  ],
  "Zeppelin|ZRH 16": [
    "300x55x78",
    "300x52.5x80"
  ],
  "Zeppelin|ZRH 8": [
    "300x109x39",
    "300x52.5x80"
  ],
  "Zhenyu|ZY 55": [
    "400x72.5x72",
    "400x72.5x72"
  ],
  "Zntsis Brzesko|RT-10": [
    "230x72x43"
  ]
};

// All unique track sizes
export const fullTrackSizes: string[] = [
  "108x72x37",
  "130x72x29",
  "13x4x56",
  "150x60x40",
  "15x4x166",
  "15x4x56",
  "160x60x34",
  "160x60x35",
  "160x60x37",
  "170x60x34",
  "170x60x37",
  "180x60x28",
  "180x60x30",
  "180x60x34",
  "180x60x35",
  "180x60x37",
  "180x60x38",
  "180x68x28",
  "180x723x37",
  "180x72x31",
  "180x72x32",
  "180x72x34",
  "180x72x35",
  "180x72x36",
  "180x72x37",
  "180x72x38",
  "180x72x39",
  "180x72x40",
  "180x72x41",
  "180x72x42",
  "180x72x43",
  "180x72x44",
  "180x72x45",
  "180x72x47",
  "180x72x57",
  "180x73x37",
  "18x4x200",
  "18x4x201",
  "18x4x220",
  "18x4x51",
  "18x4x56",
  "190x72x34",
  "190x72x37",
  "190x72x38",
  "190x72x39",
  "190x72x40",
  "190x72x43",
  "190x72x45",
  "200x72x31",
  "200x72x34",
  "200x72x35",
  "200x72x36",
  "200x72x37",
  "200x72x38",
  "200x72x39",
  "200x72x40",
  "200x72x41",
  "200x72x42",
  "200x72x43",
  "200x72x44",
  "200x72x45",
  "200x72x47",
  "200x72x53",
  "200x96x28",
  "200x96x30",
  "200x96x31",
  "200x96x33",
  "200x96x35",
  "20x96x33",
  "2303x72x56",
  "230x48x60",
  "230x48x62",
  "230x48x63",
  "230x48x64",
  "230x48x66",
  "230x48x68",
  "230x48x70",
  "230x48x72",
  "230x72x37",
  "230x72x39",
  "230x72x40",
  "230x72x41",
  "230x72x42",
  "230x72x43",
  "230x72x44",
  "230x72x45",
  "230x72x46",
  "230x72x47",
  "230x72x48",
  "230x72x50",
  "230x72x52",
  "230x72x54",
  "230x72x56",
  "230x72x59",
  "230x78x42",
  "230x96x30",
  "230x96x31",
  "230x96x32",
  "230x96x33",
  "230x96x34",
  "230x96x35",
  "230x96x36",
  "230x96x38",
  "230x96x39",
  "230x96x40",
  "230x96x41",
  "230x96x42",
  "230x96x66",
  "23x48x70",
  "240x72x48",
  "250x107.5x37",
  "250x107x38",
  "250x109x35",
  "250x109x36",
  "250x109x37",
  "250x109x38",
  "250x109x41",
  "250x19x37",
  "250x47x84",
  "250x48.5x80",
  "250x48.5x84",
  "250x48x72",
  "250x48x76",
  "250x48x78",
  "250x48x80",
  "250x48x82",
  "250x52.5x72",
  "250x52.5x73",
  "250x52.5x76",
  "250x52.5x77",
  "250x52.5x78",
  "250x52.5x80",
  "250x55.5x79",
  "250x72x2",
  "250x72x35",
  "250x72x39",
  "250x72x41",
  "250x72x42",
  "250x72x43",
  "250x72x44",
  "250x72x45",
  "250x72x46",
  "250x72x47",
  "250x72x48",
  "250x72x52",
  "250x72x54",
  "250x72x55",
  "250x72x56",
  "250x72x57",
  "250x72x64",
  "250x75x52",
  "250x96x38",
  "250x96x39",
  "250x96x40",
  "250x96x41",
  "260x100x42",
  "260x109x35",
  "260x109x37",
  "260x109x39",
  "260x52.5x72",
  "260x52.5x74",
  "260x52.5x76",
  "260x52.5x78",
  "260x55.5x78",
  "260x96x38",
  "260x97x40",
  "260x97x42",
  "280x52.5x82",
  "280x52x582",
  "280x72x47",
  "280x72x48",
  "280x72x52",
  "300x100x39",
  "300x100x43",
  "300x101.6x39",
  "300x101.6x40",
  "300x101.6x43",
  "300x109x35",
  "300x109x36",
  "300x109x37",
  "300x109x38",
  "300x109x39",
  "300x109x40",
  "300x109x41",
  "300x109x42",
  "300x109x43",
  "300x109x44",
  "300x25.5x80",
  "300x52.52x84",
  "300x52.5x72",
  "300x52.5x74",
  "300x52.5x76",
  "300x52.5x77",
  "300x52.5x78",
  "300x52.5x80",
  "300x52.5x82",
  "300x52.5x84",
  "300x52.5x86",
  "300x52.5x88",
  "300x52.5x90",
  "300x52.5x92",
  "300x52.5x98",
  "300x52x574",
  "300x52x588",
  "300x53x80",
  "300x53x84",
  "300x54x72",
  "300x54x74",
  "300x54x78",
  "300x54x80",
  "300x54x82",
  "300x55.5x76",
  "300x55.5x78",
  "300x55.5x82",
  "300x55x71",
  "300x55x72",
  "300x55x74",
  "300x55x75",
  "300x55x76",
  "300x55x77",
  "300x55x78",
  "300x55x79",
  "300x55x80",
  "300x55x81",
  "300x55x82",
  "300x55x84",
  "300x55x86",
  "300x55x88",
  "300x55x94",
  "300x72x45",
  "300x84x46",
  "300x86x45",
  "320x100x38",
  "320x100x40",
  "320x100x41",
  "320x100x43",
  "320x100x44",
  "320x100x45",
  "320x100x52",
  "320x106x39",
  "320x109x36",
  "320x109x39",
  "320x52.5x74",
  "320x52.5x80",
  "320x52.5x82",
  "320x52.5x88",
  "320x52.5x92",
  "320x52.5x98",
  "320x54x72",
  "320x54x78",
  "320x55x88",
  "320x86x45",
  "320x86x46",
  "320x86x48",
  "320x86x49",
  "320x86x50",
  "320x86x52",
  "320x86x53",
  "320x86x54",
  "320x86x56",
  "350x108x41",
  "350x108x42",
  "350x108x44",
  "350x109x41",
  "350x109x42",
  "350x109x44",
  "350x52.5x84",
  "350x52.5x86",
  "350x52.5x88",
  "350x52.5x90",
  "350x54.5x86",
  "350x55x88",
  "350x56x84",
  "350x73x74",
  "350x73x76",
  "350x75.5x74",
  "375x86x50",
  "375x86x52",
  "375x86x54",
  "375x86x56",
  "380x86x52",
  "381x100x42",
  "381x101.6x42",
  "400x132x37",
  "400x135x38",
  "400x135x39",
  "400x142x36",
  "400x142x37",
  "400x142x38",
  "400x142x39",
  "400x146x35",
  "400x146x36",
  "400x146x37",
  "400x72.5x68",
  "400x72.5x70",
  "400x72.5x72",
  "400x72.5x73",
  "400x72.5x74",
  "400x72.5x76",
  "400x72.5x78",
  "400x72.5x82",
  "400x725.5x74",
  "400x725x72",
  "400x72x74",
  "400x73x68",
  "400x73x70",
  "400x73x72",
  "400x73x74",
  "400x73x76",
  "400x73x82",
  "400x74x68",
  "400x74x72",
  "400x75.2x72",
  "400x75.5x74",
  "400x86x42",
  "400x86x49",
  "400x86x50",
  "400x86x52",
  "400x86x53",
  "400x86x54",
  "400x86x55",
  "400x86x56",
  "400x86x60",
  "40x73x72",
  "40x86x60",
  "420x100x52",
  "420x100x54",
  "450x100x48",
  "450x100x50",
  "450x110x74",
  "450x135x42",
  "450x145x40",
  "450x163x38",
  "450x71x182",
  "450x71x78",
  "450x71x82",
  "450x71x84",
  "450x71x86",
  "450x73.5x80",
  "450x73x80",
  "450x76x80",
  "450x76x82",
  "450x76x84",
  "450x81.5x74",
  "450x81.5x76",
  "450x81.5x78",
  "450x81x72",
  "450x81x74",
  "450x81x76",
  "450x81x78",
  "450x83.5x74",
  "450x84x53",
  "450x84x57",
  "450x84x59",
  "450x84x74",
  "450x86x42",
  "450x86x52",
  "450x86x53",
  "450x86x54",
  "450x86x55",
  "450x86x56",
  "450x86x58",
  "450x86x60",
  "450x86x63",
  "450x8x60",
  "457x100.6x51",
  "457x100.6x56",
  "457x100x51",
  "457x101.6x50",
  "457x101.6x51",
  "457x101.6x55",
  "485x92x72",
  "500x100x65",
  "500x90x78",
  "500x90x82",
  "500x92x72",
  "500x92x78",
  "500x92x84",
  "500x92x88",
  "700x100x98",
  "750x150x66"
];

// Get all brands sorted alphabetically
export const fullBrands: string[] = [
  "A.X.I.",
  "ACM",
  "ALLEN",
  "ALLtrack",
  "ASV",
  "ATN",
  "Abbati",
  "Aces",
  "Active",
  "Agri",
  "Aichi",
  "Airman",
  "Airman-Foredil",
  "Almac",
  "Amerequip Eagle",
  "American Direction Drill",
  "Ammann",
  "Andreoli",
  "Angel",
  "Antec",
  "Apageo",
  "Aros China",
  "Astec",
  "Atex",
  "Athena",
  "Atlas",
  "Ausa",
  "Avant Tecno",
  "Awasi",
  "BOART LONGYEAR",
  "Babyack",
  "Bandit",
  "Baraladi",
  "Baratti",
  "Barreto",
  "Bastei",
  "Belle",
  "Bellon Maria",
  "Benassi",
  "Benati",
  "Benfra",
  "Bentrac",
  "Beretta",
  "Bergmann",
  "Bertani",
  "Bertolini",
  "Betram",
  "Bitelli",
  "Bluelift",
  "Bobcat",
  "Bonne Esperance",
  "Bormor",
  "Boxer",
  "Brokk",
  "C & F",
  "CARAVAGGI",
  "CASE",
  "CAT",
  "CEASER",
  "CELA",
  "CFC",
  "CMC",
  "CME",
  "Cameca",
  "Camisa",
  "Cams Libra",
  "Carlton",
  "Carmix",
  "Carrier",
  "Casorzo",
  "Celli",
  "Chieftan",
  "Chikusui/Canycom",
  "Collina",
  "Coltrax",
  "Comacchio",
  "Comeca",
  "Comet",
  "Commander",
  "Comoter",
  "Compair Holman",
  "Conjet",
  "Cormidi",
  "DLGZ",
  "Daewoo",
  "Dimex",
  "Dino",
  "Ditch-Witch",
  "Dodich",
  "Domine",
  "Doosan",
  "Drago",
  "Dumec",
  "Durso",
  "Dynapac",
  "EFCO",
  "EMCI",
  "Eckart",
  "Ecofore",
  "Electro Joe",
  "Energreen",
  "Enteco",
  "Erreppi",
  "EuroCAT",
  "EuroTrac",
  "EurocoMach",
  "Eurodig",
  "Eurofor",
  "Eurotom",
  "FAI",
  "FIGO",
  "FORT",
  "Falcon Spider",
  "Fercad",
  "Fermec",
  "Fiat-Hitachi",
  "Fiori",
  "Foredil",
  "Forti",
  "Fraste",
  "Gayk",
  "Geawelltech",
  "Gehl",
  "Gehlmax",
  "Geier",
  "Gelai & Castegnaro",
  "Genie",
  "Geoprobe",
  "Goman",
  "Green Mech",
  "Green Technik",
  "Grillo",
  "Grundohit",
  "HCC",
  "HOEFLON",
  "Hades",
  "Haihong",
  "Hainzl",
  "Hanix",
  "Hansa",
  "Hanta",
  "Haulotte",
  "Hematec",
  "Hengte",
  "Hiab",
  "Hinowa",
  "Hitachi",
  "Hokuetsu",
  "Holmac",
  "Holman",
  "Holmed",
  "Honda",
  "Huki",
  "Husqvarna",
  "Hutte",
  "Hutter",
  "Hydra",
  "Hydramac",
  "Hydro Rain",
  "Hyundai",
  "ICE(Internationalstruction Equipment INC",
  "IHI",
  "INOVA",
  "Imai",
  "Imef",
  "Imer",
  "Italmec",
  "JCB",
  "JIEHE",
  "JLG",
  "Jekko",
  "John Deere",
  "Joly",
  "Kaidi",
  "Kato",
  "Kato-Imer",
  "Kawasaki",
  "Kobelco",
  "Komatsu",
  "Kubota",
  "Link-Belt",
  "MBU",
  "Macanizacion Y Mineria Sa",
  "Macmoter",
  "Madro",
  "Maeda",
  "Manitou",
  "Massey Ferguson",
  "Maweco",
  "Maxima",
  "Mc Connel",
  "Mc Elory",
  "Mecalac",
  "Mecanica Benassi",
  "Mecbo",
  "Meinl",
  "Menzi Muck",
  "Merlo",
  "Mertz",
  "Messersi",
  "Mini Mustang",
  "Minicarrier",
  "Minidig",
  "Mintrac",
  "Mira",
  "Mitsubishi",
  "Monitor",
  "Mopas",
  "Morath",
  "Morooka",
  "Multidrill",
  "Multitel",
  "Mustang",
  "Nagano",
  "Nagano Highland",
  "Nante",
  "Navago",
  "Navigator",
  "Nemag",
  "Nemek",
  "New Holland",
  "Nibbi",
  "Nifty",
  "Nihon Flex",
  "Nihon Freki",
  "Niko",
  "Nissan",
  "Pagani Geotechnical Equipment",
  "Palazzani",
  "Paus-Hermann",
  "Pauselli",
  "Pazzaglia",
  "Peljob",
  "Penta Moter",
  "Pezzolato",
  "Picchio",
  "Piccini",
  "Platform Basket",
  "Platinum Lift",
  "Porello",
  "Porrello",
  "Positrack",
  "Powerfab",
  "Powerpac",
  "Pressoil",
  "Putzmeister",
  "QIYUN",
  "RHINOCEROS",
  "Rampicar",
  "Ramrod",
  "Rayco",
  "Raymar",
  "Renders",
  "Riebsamen",
  "Rock",
  "Rocky Rapid",
  "Rolatec",
  "Rossi",
  "Rotomax",
  "Rufener",
  "SDP Manufacturing",
  "SMC",
  "SUP",
  "Sacet",
  "Samsung",
  "Sandqueen Uk",
  "Sany",
  "Sato",
  "Satvia",
  "Scattrack",
  "Schaefer",
  "Schaeff",
  "Sedidrill",
  "Senic",
  "Sequani",
  "Shibura",
  "Shin-Towa",
  "Showa Aircraft",
  "Sicocu",
  "Sika",
  "Silea",
  "Silla",
  "Slane",
  "Slane International",
  "Smac",
  "So.Ca.Ce",
  "Socomafor",
  "Soma",
  "Stanley",
  "Stenuick",
  "Straightline",
  "Streck",
  "Sumitomo",
  "Sunward",
  "Supertoy",
  "TAIANLUYUE",
  "TCP",
  "TECOINSA",
  "TES",
  "TRACCESS",
  "TRS",
  "TZ",
  "Tadano",
  "Takeuchi",
  "Tanaka",
  "Taylorst. Plant",
  "Tecniwell",
  "Tekna",
  "Terex",
  "Terra Jet",
  "Terramac",
  "Terramite",
  "Tescar",
  "Thomas",
  "Tifermec",
  "Top Steel",
  "Top Tec",
  "Topcat",
  "Track Star",
  "Trackbull",
  "Trak",
  "Traklift",
  "Trax",
  "Traxmax",
  "Turchi",
  "Unic",
  "Unimov",
  "Unkauf",
  "Upright",
  "Utex",
  "VIMALFIRE",
  "Velcodrill",
  "Venieri",
  "Vermeer",
  "Vnk Crane Europe",
  "Volvo",
  "WAMET",
  "Wacker Neuson",
  "Wyssen",
  "XCMG",
  "Yamaguchi / Winbull",
  "Yanmar",
  "Ygry",
  "Yuchai",
  "Yutani",
  "Zavattini",
  "Zeppelin",
  "Zhenyu",
  "Zntsis Brzesko"
];

// Popular brands (prioritized for display)
export const popularBrands: string[] = [
  "Kubota",
  "Bobcat",
  "CAT",
  "John Deere",
  "Takeuchi",
  "CASE",
  "Komatsu",
  "Hitachi",
  "Yanmar",
  "New Holland",
  "JCB",
  "Kobelco",
  "Volvo",
  "Ditch-Witch",
  "Vermeer",
  "Wacker Neuson",
  "Mustang",
  "Gehl",
  "Terex",
  "ASV",
];

/**
 * Get models for a brand
 */
export function getModelsForBrand(brand: string): string[] {
  // Try exact match first
  if (fullMachineModels[brand]) {
    return fullMachineModels[brand];
  }
  
  // Try case-insensitive match
  const normalizedBrand = brand.toLowerCase();
  for (const [key, models] of Object.entries(fullMachineModels)) {
    if (key.toLowerCase() === normalizedBrand) {
      return models;
    }
  }
  
  // Try brand aliases
  const aliases = resolveBrandAlias(brand);
  for (const alias of aliases) {
    for (const [key, models] of Object.entries(fullMachineModels)) {
      if (key.toLowerCase() === alias.toLowerCase()) {
        return models;
      }
    }
  }
  
  return [];
}

/**
 * Get track sizes for a specific machine
 */
export function getTrackSizesForMachine(brand: string, model: string): string[] {
  // Try exact key
  const exactKey = `${brand}|${model}`;
  if (fullMachineCompatibility[exactKey]) {
    return fullMachineCompatibility[exactKey];
  }
  
  // Try normalized matching
  const normalizedBrand = normalizeForMatching(brand);
  const normalizedModel = normalizeForMatching(model);
  
  for (const [key, sizes] of Object.entries(fullMachineCompatibility)) {
    const [keyBrand, keyModel] = key.split('|');
    if (normalizeForMatching(keyBrand) === normalizedBrand &&
        normalizeForMatching(keyModel) === normalizedModel) {
      return sizes;
    }
  }
  
  return [];
}

/**
 * Search machines by query (brand, model, or both)
 * Uses aggressive normalization
 */
export function searchMachines(query: string): { brand: string; model: string; trackSizes: string[] }[] {
  const normalizedQuery = normalizeForMatching(query);
  const queryWords = query.toLowerCase().split(/\s+/).filter(Boolean);
  const results: { brand: string; model: string; trackSizes: string[] }[] = [];
  
  for (const [key, sizes] of Object.entries(fullMachineCompatibility)) {
    const [brand, model] = key.split('|');
    const normalizedBrand = normalizeForMatching(brand);
    const normalizedModel = normalizeForMatching(model);
    const normalizedFull = normalizeForMatching(`${brand} ${model}`);
    
    // Check various matching strategies
    let matches = false;
    
    // 1. Full normalized match
    if (normalizedFull.includes(normalizedQuery)) {
      matches = true;
    }
    
    // 2. Model only match (e.g., "KX018-4")
    if (!matches && normalizedModel.includes(normalizedQuery)) {
      matches = true;
    }
    
    // 3. Brand only match
    if (!matches && normalizedBrand.includes(normalizedQuery)) {
      matches = true;
    }
    
    // 4. All query words match (for "kubota svl75" etc.)
    if (!matches && queryWords.length > 1) {
      const fullLower = `${brand} ${model}`.toLowerCase();
      const allWordsMatch = queryWords.every(word => {
        const normalizedWord = normalizeForMatching(word);
        return normalizedFull.includes(normalizedWord) ||
               fullLower.includes(word);
      });
      if (allWordsMatch) {
        matches = true;
      }
    }
    
    // 5. Check brand aliases
    if (!matches) {
      const aliases = resolveBrandAlias(queryWords[0] || '');
      for (const alias of aliases) {
        if (normalizedBrand === normalizeForMatching(alias)) {
          // Brand alias matches, check if model matches remaining query
          const remainingQuery = queryWords.slice(1).join('');
          if (!remainingQuery || normalizedModel.includes(normalizeForMatching(remainingQuery))) {
            matches = true;
            break;
          }
        }
      }
    }
    
    if (matches) {
      results.push({ brand, model, trackSizes: sizes });
    }
  }
  
  return results;
}

/**
 * Get machines compatible with a track size
 */
export function getMachinesForTrackSize(trackSize: string): { brand: string; model: string }[] {
  const normalizedSize = normalizeForMatching(trackSize);
  const results: { brand: string; model: string }[] = [];
  
  for (const [key, sizes] of Object.entries(fullMachineCompatibility)) {
    const [brand, model] = key.split('|');
    
    for (const size of sizes) {
      if (normalizeForMatching(size) === normalizedSize) {
        results.push({ brand, model });
        break;
      }
    }
  }
  
  return results;
}

/**
 * Get brand statistics
 */
export function getBrandStats(): { brand: string; modelCount: number }[] {
  return Object.entries(fullMachineModels)
    .map(([brand, models]) => ({
      brand,
      modelCount: models.length
    }))
    .sort((a, b) => b.modelCount - a.modelCount);
}

/**
 * Check if a query looks like a track size
 */
export function isTrackSizeQuery(query: string): boolean {
  // Track sizes follow patterns like: 400x86x52, 300x52.5x80
  const trackSizePattern = /^\d{3}x\d{2,3}\.?\d*x\d{2,3}$/i;
  const normalized = query.replace(/[\s-]/g, '');
  return trackSizePattern.test(normalized);
}
