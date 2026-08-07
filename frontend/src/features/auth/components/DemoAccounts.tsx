import { DEMO_ACCOUNTS } from "@/constants/demoAccounts";

type Props = {
  onSelect: (email: string, password: string) => void;
};

export default function DemoAccounts({ onSelect }: Props) {
  return (
    <div className="mt-6 rounded-3xl bg-white p-5 shadow-lg">
      <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-blue-600">
        Demo Accounts
      </h3>

      <div className="space-y-3">
        {DEMO_ACCOUNTS.map((account) => (
          <button
            key={account.email}
            type="button"
            onClick={() => onSelect(account.email, account.password)}
            className="
              flex
              w-full
              items-center
              justify-between
              rounded-2xl
              bg-slate-50
              px-4
              py-3
              transition
              hover:bg-blue-50
            "
          >
            <span className="font-semibold">{account.role}</span>

            <span className="font-mono text-xs text-slate-500">
              {account.email}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
