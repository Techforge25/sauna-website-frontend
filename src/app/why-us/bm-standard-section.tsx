import type { ReactNode } from "react";
import { FaRegCircleCheck } from "react-icons/fa6";

import { GradientText, SectionHeading } from "@/components/ui";
import { cn } from "@/lib/utils/cn";

const comparisonRows = [
  {
    feature: "Privacy",
    bm: "100% Private",
    publicSaunas: "Shared Spaces",
  },
  {
    feature: "Cleanliness",
    bm: "Hospital-Grade",
    publicSaunas: "Variable / High Traffic",
  },
  {
    feature: "Booking",
    bm: "Instant Guest Access",
    publicSaunas: "Membership Required",
  },
  {
    feature: "Ice Cold Plunge",
    bm: "Included in Every Session",
    publicSaunas: "Rarely Available / Extra Cost",
  },
  {
    feature: "Entry",
    bm: "Secure Digital Code",
    publicSaunas: "Staff / Reception Desk",
  },
] as const;

const columnClasses = {
  feature: "w-[248px]",
  bm: "w-[403px]",
  publicSaunas: "w-[373px]",
};

export function BmStandardSection() {
  return (
    <section className="bg-surface px-5 py-16 sm:px-8 lg:px-[120px] lg:py-[100px]">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-[62px]">
        <div className="flex flex-col items-center gap-3 text-center">
          <SectionHeading className="whitespace-normal sm:whitespace-nowrap">
            The <GradientText>B&amp;M</GradientText> Standard
          </SectionHeading>
          <p className="text-lg leading-6 text-muted">
            How we stack up against the old way of doing things.
          </p>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[900px] table-fixed border-collapse">
            <thead>
              <tr className="border-b-2 border-primary">
                <HeaderCell className={columnClasses.feature}>Feature</HeaderCell>
                <HeaderCell className={cn(columnClasses.bm, "text-primary")}>
                  B&amp;M Saunas
                </HeaderCell>
                <HeaderCell className={columnClasses.publicSaunas}>
                  Public Saunas
                </HeaderCell>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr className="border-t border-border" key={row.feature}>
                  <FeatureCell>{row.feature}</FeatureCell>
                  <DataCell>
                    <span className="inline-flex items-center gap-1">
                      <FaRegCircleCheck
                        aria-hidden="true"
                        className="size-5 shrink-0 text-[#18a558]"
                      />
                      {row.bm}
                    </span>
                  </DataCell>
                  <DataCell>{row.publicSaunas}</DataCell>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

type TableCellProps = {
  children: ReactNode;
  className?: string;
};

function HeaderCell({ children, className }: TableCellProps) {
  return (
    <th
      className={cn(
        "px-8 pb-[17px] pt-4 text-left font-serif text-lg font-semibold leading-7 text-foreground",
        className,
      )}
      scope="col"
    >
      {children}
    </th>
  );
}

function FeatureCell({ children }: Pick<TableCellProps, "children">) {
  return (
    <th
      className={cn(
        columnClasses.feature,
        "px-8 py-[18.5px] text-left text-base font-bold leading-5 text-primary",
      )}
      scope="row"
    >
      {children}
    </th>
  );
}

function DataCell({ children }: Pick<TableCellProps, "children">) {
  return (
    <td className="px-8 py-4 text-base leading-6 text-muted">{children}</td>
  );
}
