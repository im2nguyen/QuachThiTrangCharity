export type BenefactorRow = {
  date: string;
  name: string;
  amount: string;
  note?: string;
};

export const benefactorYears = [2025, 2024] as const;
export type BenefactorYear = (typeof benefactorYears)[number];

const BENEFACTORS_2025: BenefactorRow[] = [
  { date: "2/19/2025", name: "Mr. H Doan, San Diego, CA", amount: "$200.00" },
  { date: "6/17/2025", name: "My & Cac Quach family, VA", amount: "$800.00" },
  { date: "6/26/2025", name: "Thang Quach, CA", amount: "$600.00" },
  { date: "6/26/2025", name: "Tam & Phong Bui Family, Laguna Hills, CA", amount: "$1.00" },
  { date: "6/26/2025", name: "Vicky & Quang Vo Family, San Diego, CA", amount: "$1.00" },
  { date: "6/26/2025", name: "Anh Lan Nguyen, TX", amount: "$1,500.00" },
  { date: "7/1/2025", name: "Tam & Phong Bui Family, Laguna Hills, CA", amount: "$800.00" },
  { date: "7/1/2025", name: "Jeannie L Quach, CA", amount: "$201.00" },
  { date: "7/2/2025", name: "Advance Pain Center, GA", amount: "$2,000.00" },
  { date: "7/2/2025", name: "Vicky & Quang Vo Family, San Diego, CA", amount: "$400.00" },
  { date: "7/5/2025", name: "Dr. Duc Quach, Riverside, CA", amount: "$1,000.00" },
  { date: "7/6/2025", name: "Annie Nguyen, GA", amount: "$500.00" },
  { date: "7/6/2025", name: "Dat T Quach, CA", amount: "$500.00" },
  { date: "7/13/2025", name: "Advance Pain Center LLC, GA", amount: "$1,000.00" },
  { date: "7/13/2025", name: "Thanh Quach, AZ", amount: "$1,500.00" },
  { date: "7/14/2025", name: "Dr. Clarissa Quach, CA", amount: "$10.00" },
  { date: "7/14/2025", name: "Mr. Daniel Larkin, CA", amount: "$1,000.00" },
  { date: "7/16/2025", name: "Dr. Clarissa Quach", amount: "$990.00" },
  { date: "7/23/2025", name: "Elaine V Bui, PharmD., CA", amount: "$100.00" },
  { date: "7/28/2025", name: "Dong Quach, CA", amount: "$2,000.00" },
  { date: "10/27/2025", name: "Dr. Stephanie Quach, OH", amount: "$250.00" },
  { date: "11/27/2025", name: "Alina Quach, PharmD., WA", amount: "$500.00" },
];

const BENEFACTORS_2024: BenefactorRow[] = [
  { date: "7/2/2024", name: "Bich & Dong Quach, Irvine, CA", amount: "$100.00" },
  { date: "7/2/2024", name: "Ann Quach, Sierra Vista, AZ", amount: "$100.00" },
  { date: "7/5/2024", name: "Annie Nguyen, Statham, GA", amount: "$5.00" },
  { date: "7/5/2024", name: "Vicky & Quang Vo Family, San Diego, CA", amount: "$1.00" },
  { date: "7/9/2024", name: "My & Cac Quach family, Virginia Beach, VA", amount: "$800.00" },
  { date: "7/9/2024", name: "My & Cac Quach family, Virginia Beach, VA", amount: "$5.00" },
  {
    date: "7/10/2024",
    name: "Elaine, Anthony, Tam & Phong Bui family, Laguna Hills, CA",
    amount: "$400.00",
  },
  { date: "7/10/2024", name: "Thanh Quach, Sierra Vista, AZ", amount: "$100.00" },
  { date: "7/10/2024", name: "Loan Quach, Garden Grove, CA", amount: "$100.00" },
  {
    date: "7/10/2024",
    name: "Elaine, Anthony, Tam & Phong Bui family, Laguna Hills, CA",
    amount: "$1.00",
  },
  { date: "7/11/2024", name: "Advance Pain Center, LLC, Atlanta, GA", amount: "$1.00" },
  { date: "7/11/2024", name: "Advance Pain Center, LLC, Atlanta, GA", amount: "$1,500.00" },
  { date: "7/11/2024", name: "Annie Nguyen, Statham, GA", amount: "$695.00" },
  { date: "7/15/2024", name: "Thang Quach Family, Lancaster, CA", amount: "$1.00" },
  { date: "7/15/2024", name: "Thang Quach Family, Lancaster, CA", amount: "$499.00" },
  { date: "7/15/2024", name: "Thang Quach Family, Lancaster, CA", amount: "$100.00" },
  { date: "7/16/2024", name: "Vicky & Quang Vo Family, San Diego, CA", amount: "$400.00" },
  { date: "7/17/2024", name: "Anh Lan Nguyen, Houston, TX", amount: "$10.00" },
  { date: "7/17/2024", name: "Anh Lan Nguyen, Houston, TX", amount: "$990.00" },
  { date: "7/18/2024", name: "Ann Quach, Sierra Vista, AZ", amount: "$1,300.00" },
  { date: "7/22/2024", name: "Dr. Duc Quach, Riverside, CA", amount: "$1.00" },
  { date: "7/22/2024", name: "Dr. Duc Quach, Riverside, CA", amount: "$499.00" },
  { date: "7/29/2024", name: "Bich & Dong Quach, Irvine, CA", amount: "$3,400.00" },
  { date: "7/29/2024", name: "Bich & Dong Quach, Irvine, CA", amount: "$100.00" },
  { date: "8/1/2024", name: "Bich & Dong Quach, Irvine, CA", amount: "$1,500.00" },
  { date: "8/5/2024", name: "Bich & Dong Quach, Irvine, CA", amount: "$3,000.00" },
  { date: "8/5/2024", name: "Dr. David Pham", amount: "$2,000.00" },
  { date: "9/18/2024", name: "Thanh Quach, Sierra Vista, AZ", amount: "$4.37" },
  { date: "10/29/2024", name: "Mr. H Doan, San Diego, CA", amount: "$200.00" },
];

const BY_YEAR: Record<BenefactorYear, BenefactorRow[]> = {
  2025: BENEFACTORS_2025,
  2024: BENEFACTORS_2024,
};

export function getBenefactors(year: BenefactorYear): BenefactorRow[] {
  return BY_YEAR[year];
}

export function sumBenefactorAmounts(rows: BenefactorRow[]): number {
  return rows.reduce((total, row) => {
    const n = Number(row.amount.replace(/[$,]/g, ""));
    return total + (Number.isFinite(n) ? n : 0);
  }, 0);
}
