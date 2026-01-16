import React, { useEffect, useState } from "react";
import { View, Text, Button, Alert } from "react-native";
import * as RNIap from "react-native-iap";

const subscriptionSkus = ["your_subscription_id"]; // Replace with your product IDs

const SubscriptionScreen = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    RNIap.initConnection().then(() => {
      RNIap.getSubscriptions(subscriptionSkus).then(setSubscriptions);
    });
    return () => {
      RNIap.endConnection();
    };
  }, []);

  const purchaseSubscription = async (sku) => {
    setLoading(true);
    try {
      await RNIap.requestSubscription(sku);
      Alert.alert("Success", "Subscription purchased!");
      // TODO: Verify purchase on backend
    } catch (err) {
      Alert.alert("Error", err.message);
    }
    setLoading(false);
  };

  return (
    <View>
      <Text>Available Subscriptions:</Text>
      {subscriptions.map((sub) => (
        <View key={sub.productId}>
          <Text>{sub.title} - {sub.localizedPrice}</Text>
          <Button
            title="Subscribe"
            onPress={() => purchaseSubscription(sub.productId)}
            disabled={loading}
          />
        </View>
      ))}
    </View>
  );
};

export default SubscriptionScreen;
