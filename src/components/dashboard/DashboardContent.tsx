import { Home, Droplets, Cloud, GamepadIcon, MessageSquare } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

const statsCards = [
  {
    title: 'Balance',
    amount: '$ 23,700',
    change: '23.1% than last Month',
    isPositive: true,
  },
  {
    title: 'Spending',
    amount: '$ 2,000',
    change: '10.1% than last Month',
    isPositive: false,
  },
  {
    title: 'Portfolio',
    amount: '$ 45,000',
    change: '3.1% than last Month',
    isPositive: true,
  },
  {
    title: 'Investment',
    amount: '$ 54,000',
    change: '14.7% than last Month',
    isPositive: true,
  },
]

const spendingItems = [
  { icon: Home, label: 'Home Rent', amount: '-$240' },
  { icon: Droplets, label: 'Gasoline', amount: '-$150' },
  { icon: Cloud, label: 'Internet Bill', amount: '-$32' },
]

const recentTransactions = [
  { icon: GamepadIcon, label: 'XBOX', description: 'Lorem ipsum is simply dummy text', amount: '-$130' },
  { icon: MessageSquare, label: 'Google', description: 'Lorem ipsum is simply dummy text', amount: '-$23' },
  { icon: MessageSquare, label: 'Steam', description: 'Lorem ipsum is simply dummy text', amount: '-$64' },
  { icon: MessageSquare, label: 'Spotify', description: 'Lorem ipsum is simply dummy text', amount: '-$89' },
  { icon: MessageSquare, label: 'Twitch', description: 'Lorem ipsum is simply dummy text', amount: '-$234' },
]

export function DashboardContent() {
  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="space-y-1">
              <h3 className="text-sm text-gray-500">{stat.title}</h3>
              <p className="text-2xl font-semibold">{stat.amount}</p>
              <p className={cn(
                "text-sm",
                stat.isPositive ? "text-green-600" : "text-red-600"
              )}>
                {stat.change}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Spending Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {spendingItems.map((item, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <item.icon className="w-6 h-6 text-gray-600" />
                </div>
                <span className="font-medium">{item.label}</span>
              </div>
              <span className="text-red-600 font-medium">{item.amount}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Transactions */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
        <div className="space-y-4">
          {recentTransactions.map((transaction, index) => (
            <div key={index} className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <transaction.icon className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-medium">{transaction.label}</h3>
                  <p className="text-sm text-gray-500">{transaction.description}</p>
                </div>
              </div>
              <span className="text-red-600 font-medium">{transaction.amount}</span>
            </div>
          ))}
        </div>
        <button className="mt-4 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800">
          Read More
        </button>
      </Card>
    </div>
  )
} 